import React, { Component } from 'react'
import './login.css'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Link
} from 'react-router-dom'
import { ActionSheet, Toast } from 'antd-mobile'
// import * as io from 'socket.io-client'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let wrapProps
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    
    this.changeHandle = this.changeHandle.bind(this)
    this.toLogin = this.toLogin.bind(this)
    
    this.state = {
      username: '',
      password: '',
      bool: false
    }
  }
  
  username = ''
  password = ''
  bool = ''
  
  successToast(value) {
    Toast.success(value, 2)
  }
  
  failToast(value) {
    Toast.fail(value, 2)
  }
  
  changeHandle(event) {
    const obj = event.target
    const value = obj.value
    const name = obj.name
    this[name] = value
    // if(this.username != "" && this.password != ""){
    //   this.bool = true;
    // }else {
    //   this.bool = false;
    // }
  }
  
  toLogin() {
    const _this = this
    const userInfo = {
      username: this.username,
      password: this.password
    }
    axios.post('/api/login', userInfo).then(res => {
      if (res.data.status === 'success') {
        window.socket.emit('join', res.data.userInfo._id)
        _this.props.dispatch({ type: 'SAVE_INFO', data: res.data.userInfo })
        _this.props.history.replace({ pathname: '/chatlist' })
      } else {
        _this.successToast(res.data.message)
      }
    })
  }
  
  showActionSheet = () => {
    const BUTTONS = ['切换账号', '找回密码', '注册', '关闭', '取消']
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      // title: 'title',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps
    },
    (buttonIndex) => {
      if (buttonIndex === 2) {
        this.props.history.replace('/register')
      }
    })
  }
  
  render() {
    return (
      <div id='login'>
        <Link to='/register' className='close iconfont icon-close'/>
        <div className='login_inputs'>
          <div className='input_wrap'><input name='username' ref='username' onChange={this.changeHandle} type='text' placeholder='请输入账号'/></div>
          <div className='input_wrap'><input name='password' ref='password' onChange={this.changeHandle} type='password' placeholder='请输入密码'/></div>
        </div>
        <div onClick={this.toLogin} className='green_btn'>登录</div>
        <div className='more-option' onClick={this.showActionSheet}>更多选项</div>
      </div>
    )
  }
}

export default connect()(Login)

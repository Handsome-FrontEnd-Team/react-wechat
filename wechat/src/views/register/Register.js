import React, { Component } from 'react'
import './register.css'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { ActionSheet, Toast } from 'antd-mobile'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let wrapProps
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

class Register extends Component {
  constructor(props) {
    super(props)

    this.changeHandle = this.changeHandle.bind(this)
    this.toRegister = this.toRegister.bind(this)

    this.state = {
      username: '',
      password: '',
      bool: false
    }
  }
  changeHandle(event) {
    const obj = event.target
    const value = obj.value
    const name = obj.name
    this[name] = value
  }
  
  username = ''
  password = ''
  nickname = ''

  successToast(value) {
    Toast.success(value, 1)
  }
  failToast(value) {
    Toast.fail(value, 1)
  }
  toRegister() {
    const _this = this
    const userInfo = {
      username: this.username,
      password: this.password,
      nickname: this.nickname
    }

    if (!userInfo.username || !userInfo.password || !userInfo.nickname) {
      this.failToast('请输入内容！！！')
    }

    axios.post('/api/register', userInfo).then(res => {
      if (res.data.status === 'success') {
        window.socket.emit('join', res.data.userInfo._id)
        _this.props.dispatch({ type: 'SAVE_INFO', data: res.data.userInfo })
        _this.props.history.replace('/chatlist')
      } else {
        _this.failToast('添加失败！！！')
      }
    })
  }

  showActionSheet = () => {
    const BUTTONS = ['登录', '关闭', '取消']
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
      if (buttonIndex === 0) {
        this.props.history.replace('/login')
      }
    })
  }

  render() {
    return (
      <div id='register'>
        <Link to='/login' className=' close iconfont icon-close'/>
        <div className='upload_logo'/>
        <div className='login_inputs'>
          <div className='input_wrap'><input name='username' onChange={this.changeHandle} type='text' placeholder='请输入账号' /></div>
          <div className='input_wrap'><input name='password' onChange={this.changeHandle} type='password' placeholder='请输入密码' /></div>
          <div className='input_wrap'><input name='nickname' onChange={this.changeHandle} type='nickname' placeholder='请输入昵称' /></div>
        </div>
        <div onClick={this.toRegister} className='green_btn'>注册</div>
        <div className='more-option' onClick={this.showActionSheet}>更多选项</div>
      </div>
    )
  }
}

export default connect()(Register)

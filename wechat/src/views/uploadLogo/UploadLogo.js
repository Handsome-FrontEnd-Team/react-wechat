import React, { Component } from 'react'
import './uploadLogo.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
// let wrapProps
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault()
//   }
// }

class UploadLogo extends Component {
  constructor(props) {
    super(props)
    this.successToast = this.successToast.bind(this)
    this.failToast = this.failToast.bind(this)
    this.onUpload = this.onUpload.bind(this)
  }
  
  successToast(value) {
    Toast.success(value, 2)
  }
  
  failToast(value) {
    Toast.fail(value, 2)
  }
  
  onUpload(e) {
    const _this = this
    const img = e.target.files[0]
    const formdata = new FormData()
    
    formdata.append('avatar', img)
    formdata.append('id', this.props.self_id)
    axios.post('/api/uploadLogo', formdata).then(res => {
      if (res.data.status === 'success') {
        _this.props.dispatch({ type: 'UPDATE_LOGO', url: res.data.url })
        _this.successToast('上传成功')
      }
    }).catch(err => {
      _this.failToast('上传失败', err)
    })
  }
  
  render() {
    return (
      <div id='uploadLogo'>
        <Header onUpload={this.onUpload} field={{ title: '个人头像', path: '/uploadLogo' }}/>
        <div className='logo_wrap'>
          <img src={this.props.self_logo} alt=''/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    self_logo: state.save_info.logo,
    self_id: state.save_info._id
  }
}

export default connect(mapStateToProps)(UploadLogo)

/**
 * 创建于 2018/12/30
 * 作者: SHERlocked93
 * 功能: axios封装
 */

import axios from 'axios'
import { getToken } from 'utils/stock'

const { APP_URL: baseURL } = require('../global')

// const tokenWhiteList = []

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = getToken()  // 每个请求携带自定义token
  if (config.method.toLowerCase() === 'get') { // 解决IE下ajax请求发送不出去的问题
    config.params = config.params || {}
    config.params.forStupidIE = +new Date()
  }
  
  return config
}, error => {
  console.log('Error at response: ', error)
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('Error at response: ', error)
    return Promise.reject(error)
  }
)

export default service

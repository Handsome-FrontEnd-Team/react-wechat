/**
 * 创建于 2018/12/29
 * 作者: SHERlocked93
 * 功能: 开发环境下的proxy设置
 * 参考: https://stackoverflow.com/questions/52605997/when-specified-proxy-in-package-json-must-be-a-string
 */

const proxy = require('http-proxy-middleware')
const ip = require('ip').address()
const { APP_PORT } = require('../../global')

module.exports = function(app) {
  app.use(proxy('/api', {
    target: `http://${ip}:${APP_PORT}/`
  }))
}

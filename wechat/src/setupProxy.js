const proxy = require('http-proxy-middleware')
const ip = require('ip').address()
const SERVER_CHAT_HOST = 4000

module.exports = function(app) {
  app.use(proxy('/api', {
    target: `http://${ip}:${SERVER_CHAT_HOST}/`
  }))
}

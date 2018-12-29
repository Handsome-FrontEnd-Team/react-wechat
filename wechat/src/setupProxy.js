const proxy = require('http-proxy-middleware')
const ip = require('ip').address()
const { APP_PORT } = require('../../global')

module.exports = function(app) {
  app.use(proxy('/api', {
    target: `http://${ip}:${APP_PORT}/`
  }))
}

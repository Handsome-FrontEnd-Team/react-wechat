/**
 * 创建于 2018/12/28
 * 功能: 消息分发
 */

const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const { CHAT_PORT } = require('../global')

// var express = require("express");
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.listen(CHAT_PORT)

function handler(req, res) {
  res.end('socket.io connect success')
}

const arrAllSocket = {}

io.on('connection', function(socket) {
  socket.on('join', function(userName) {
    let user = userName
    socket.username = user
    arrAllSocket[user] = socket // 把socket存到全局数组里面去
  })

  // 私聊：服务器接受到私聊信息，发送给目标用户
  socket.on('private_message', function(from, to, msg) {
    const target = arrAllSocket[to]

    if (target) {
      console.log(target.username)
      target.emit('private_message', from, to, msg)
      target.emit('common_message', from, to, msg)
    }
  })

  // 连接断开
  socket.on('disconnect', function(data) {
    delete arrAllSocket[socket.username]
  })
})

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('./mongo/mongodb.js')
const { APP_PORT } = require('../global')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().single('avatar'));
const upload = multer({ dest: '../wechat/public/logos' })
const User = require('./mongo/models/user.js')

const online_arr = []

// 注册
app.post('/api/register', function(req, res) {
  User.find({ username: req.body.username }, function(err, doc) {
    if (doc.length < 1) {
      const user = new User(req.body)
      user.save(function(err, doc) {
        if (err) res.send(err)
        res.json({
          status: 'success',
          message: '登录成功',
          userInfo: doc
        })
      })
    } else {
      res.send('用户名已存在！')
    }
  })
})

// 登录
app.post('/api/login', function(req, res) {
  const conn = {
    username: req.body.username
  }
  // if (online_arr.indexOf(req.body.username) >= 0) {
  //   res.json({
  //     status: 'error',
  //     message: "用户已在线"
  //   })
  //   return
  // }
  User.findOne(conn, function(err, doc) {
    if (!doc || doc.length < 1) {
      res.json({
        status: 'error',
        message: '该用户不存在'
      })
    } else if (doc.password !== req.body.password) {
      res.json({
        status: 'error',
        message: '密码错误！'
      })
    } else {
      // user = doc;
      online_arr.push(doc.username)
      res.json({
        status: 'success',
        message: '登录成功',
        userInfo: doc
      })
    }
  })
})

// 全局搜索好友
app.post('/api/getUsers', (req, res) => {
  let partten = new RegExp('^' + req.body.username)
  let conn = {
    username: {
      $regex: partten,
      $ne: req.body.self_username
    }
  }

  User.find(conn, (err, doc) => {
    if (doc) {
      res.json({
        status: 'success',
        message: '查找成功',
        userInfo: doc
      })
    }
  }).limit(5)
})

// 添加朋友
app.post('/api/makeFriend', (req, res) => {
  let self = req.body.self
  let friend = req.body.friend

  User.update(
    { _id: friend.id },
    { $addToSet: { friends: self } },
    (err, doc) => {}
  )
  User.update(
    { _id: self.id },
    { $addToSet: { friends: friend } },
    (err, doc) => {
      res.json({
        status: 'success',
        message: '添加好友成功'
      })
    }
  )
})

// 上传头像
app.post('/api/uploadLogo', upload.single('avatar'), (req, res) => {
  User.update(
    { _id: req.body.id },
    { $set: { logo: './logos/' + req.file.filename } },
    function() {
      res.send({
        status: 'success',
        url: './logos/' + req.file.filename
      })
    }
  )
})

// 修改名字
app.post('/api/savenickname', (req, res) => {
  User.update(
    { _id: req.body.id },
    { $set: { nickname: req.body.nickname } },
    function() {
      res.send({
        status: 'success'
      })
    }
  )
})

app.get('/api', (req, res) => res.send('Hello World!~~~'))

app.listen(APP_PORT)

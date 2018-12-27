const mongoose = require("mongoose")
const Schema = mongoose.Schema

const loginSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    friends: Array,
    logo: {
        type: String,
        default: './image/icon_moren_face.png'
    },
    rooms: Array
})

const User = mongoose.model('user', loginSchema)

module.exports = User

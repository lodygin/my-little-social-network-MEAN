const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  nickname: {type: String, required: true, unique: true},
  imageSrc: {type: String, default: ''}
})

module.exports = mongoose.model('users', userSchema)

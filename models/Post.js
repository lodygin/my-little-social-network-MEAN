const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  content: {type: String, required: true},
  title: {type: String, required: true},
  userId: {ref: 'users', type: Schema.Types.ObjectID},
  imageSrc: {type: String, default: ''},
  date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('posts', postSchema)

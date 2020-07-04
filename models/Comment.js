const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  commentContent: {type: String, required: true},
  userId: {ref: 'users', type: Schema.Types.ObjectID},
  postId: {ref: 'posts', type: Schema.Types.ObjectID},
  date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('comments', commentSchema)

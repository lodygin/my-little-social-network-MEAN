const Post = require('../models/Post')
const errorHandler = require('../utils/errorHandler')

module.exports.createPost = async function (req, res) {
  try {
    const post = new Post({
      content: req.body.content,
      title: req.body.title,
      userId: req.user.id,
      imageSrc: req.file ? req.file.path : '',
    })
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAll = async function (req, res) {
  try {
    const posts = await Post.find().sort({date: -1})
    res.status(200).json(posts)
  } catch (e) {
    errorHandler(res, e)
  }
}

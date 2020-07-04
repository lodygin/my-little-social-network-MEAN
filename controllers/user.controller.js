const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getCurrent = async function (req, res) {
  try {
    const currentUser = await User.findById(req.user.id)
    res.status(200).json(currentUser)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.setImage = async function (req, res) {
  const updated = {}
  if (req.file) {
    updated.imageSrc = req.file.path
  }

  try {
    const user = await User.findOneAndUpdate(
      {_id: req.user.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`,
        currentUser: candidate
      })
    } else {
      res.status(409).json({
        message: 'Пароли не совпадают. Попробуйте снова.'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользователь с таким email не найден.'
    })
  }
}

module.exports.register = async function (req, res) {
  const candidateEmail = await User.findOne({email: req.body.email})
  const candidateNickname = await User.findOne({nickname: req.body.nickname})

  if (candidateEmail) {
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else if (candidateNickname) {
    res.status(409).json({
      message: 'Такой псевдоним уже занят. Попробуйте другой.'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      nickname: req.body.nickname,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

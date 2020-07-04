const express = require('express')
const router = express.Router()
const controller = require('../controllers/post.controller')
const passport = require('passport')
const upload = require('../middleware/upload')

// localhost:5000/api/post
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

// localhost:5000/api/post
router.post('/', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.createPost)

module.exports = router

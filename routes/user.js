const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const passport = require('passport')
const upload = require('../middleware/upload')

// localhost:5000/api/user/current
router.get('/current', passport.authenticate('jwt', {session: false}), controller.getCurrent)

// localhost:5000/api/user/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)

router.patch('/', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.setImage)

module.exports = router

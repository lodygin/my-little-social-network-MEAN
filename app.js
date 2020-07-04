const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongo_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))

app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)

module.exports = app

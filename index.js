const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const userRoutes = require('./src/routes/user.routes')

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use('', userRoutes)

app.get('/', (req, res) => {
  res.send('Authentication Flow, bcrypt, JWT')
})

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is ready :)')
    })
  })
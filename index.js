const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const {
  isAuthenticated,
  isAdmin,
  isPremium,
  isAdminOrPremium,
  isAuthorized
} = require('./src/middlewares/auth.middleware')

const userRoutes = require('./src/routes/user.routes')

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use('', userRoutes)

app.get('/', (req, res) => {
  res.send({
    title: 'User Authentication'
  })
})

app.get('/admin/dashboard', 
  isAuthenticated, 
  isAuthorized('admin'), 
  (req, res) => {
  const { name, email } = req.user

  res.send(`
    <h1>ADMIN DASHBOARD PAGE</h1>
    <h2>Welcome admin, ${name}!</h2>
    <p>Your email is ${email}</p>
  `)
})

app.get('/movies/premium', 
  isAuthenticated, 
  isAuthorized('premium'), 
  (req, res) => {
  const { name, email } = req.user

  res.send(`
    <h1>PREMIUM MOVIES</h1>
    <h2>Welcome premium user, ${name}!</h2>
    <p>Your email is ${email}</p>
  `)
})

app.get('/movies/download', 
  isAuthenticated, 
  isAuthorized('admin', 'premium'), 
  (req, res) => {
  const { name, email } = req.user

  res.send(`
    <h1>DOWNLOAD MOVIES</h1>
    <h2>Welcome authorized user, ${name}!</h2>
    <p>Your email is ${email}</p>
  `)
})

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is ready :)')
    })
  })

/*
  # bcrypt
    - Used to encrypt sensitive details
    - Methods:
      - hash(plainText, saltRounds): Hashing
      - compare(plainText, encryptedText): Comparing encryptedText w/ plainText

  # jsonwebtoken
    - JWT (JSON Web Token)
    - Used for managing auth and session info
    - Methods:
      - sign(payload, secretOrPrivateKey, options): Creates a JWT
      - verify(token, secretOrPublicKey): Verifies JWT + returns original payload 

  # Protected route:
    - A route that can be accessed by authenticated users only

  # Authentication vs Authorization:
    - Authentication: Who are you?
      - Unauthenticated response status code: 401 Unathorized
    - Authorization: What are you allowed to do?
      - Unauthorized response status code: 403 Forbidden

*/
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

const userRoutes = require('./src/routes/user.routes')

const isUserLoggedIn = async (req, res, next) => {
  try {
    const obj = jwt.verify(req.headers.token, 'ILoveNodejs')

    console.log(obj)
    next()
  } catch (error) {
    return res.status(401).send('You are not logged in. Please login first!')
  }
}

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use('', userRoutes)

app.get('/', (req, res) => {
  res.send('Authentication Flow, bcrypt, JWT')
})

// Protected route (Authenticated users)
app.get('/dashboard', isUserLoggedIn, (req, res) => {
  const name = 'Nayeem'

  res.send(`
    <h1>THIS IS DASHBOARD PAGE</h1>
    <h2>Welcome, ${name}!</h2>
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
      - sign(payload, secretOrPrivateKey, options): Creating a token
      - verify(token, secretOrPublicKey): Verifying a token + getting original payload as a result 

*/
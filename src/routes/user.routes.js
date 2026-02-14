const express = require('express')
const router = express.Router()

const {
  fetchUsers,
  signupUser,
  signinUser
} = require('../controllers/user.controllers')

router.get('/users', fetchUsers)

router.post('/users/signup', signupUser)

router.post('/users/signin', signinUser)

module.exports = router
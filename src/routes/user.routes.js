const express = require('express')
const router = express.Router()

const {
  isAuthenticated
} = require('../middlewares/auth.middleware')

const {
  fetchUsers,
  signupUser,
  signinUser,
  getDashboard
} = require('../controllers/user.controllers')

router.get('/users', fetchUsers)

router.post('/users/signup', signupUser)

router.post('/users/signin', signinUser)

// Protected route (can be accessed by authenticated users only)
router.get('/users/dashboard', isAuthenticated, getDashboard)

module.exports = router
const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.json({
      status: 'SUCCESS',
      data: users
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)
    
    await User.create({ 
      name, 
      email, 
      password: encryptedPassword
    })

    res.status(201).json({
      status: 'SUCCESS',
      message: 'User registered successfully!'
    })
  } catch (error) {
    if(error.code == 11000) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'A user with this email exists'
      })
    }

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if(!user) {
      return res.status(401).json({
        status: 'FAILED',
        message: 'A user with this email does not exist. Please register first.'
      })
    }

    const pwdMatch = await bcrypt.compare(password, user.password)
    if(!pwdMatch) {
      return res.status(401).json({
        status: 'FAILED',
        message: 'Invalid credentials'
      })
    } 

    const token = jwt.sign({ a: 5 }, 'ILoveNodejs', { expiresIn: 30*60*1000 })

    res.json({
      status: 'SUCCESS',
      message: 'User logged in successfully!',
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  fetchUsers,
  signupUser,
  signinUser
}
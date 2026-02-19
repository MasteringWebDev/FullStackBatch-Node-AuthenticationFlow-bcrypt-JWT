const jwt = require('jsonwebtoken')

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.headers
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).send('Authentication failed. Please login first')
  }
}

// Authorization Middlewares
const isAdmin = (req, res, next) => {
  const { role } = req.user 
  if(role != 'admin') {
    return res.status(403).send('Authorization failed. You are not allowed to access this page')
  }
  next()
}

const isPremium = (req, res, next) => {
  const { role } = req.user 
  if(role != 'premium') {
    return res.status(403).send('Authorization failed. You are not allowed to access this page')
  }
  next()
}

const isAdminOrPremium = (req, res, next) => {
  const { role } = req.user 
  const allowedRoles = ['admin', 'premium']
  if(!allowedRoles.includes(role)) {
    return res.status(403).send('Authorization failed. You are not allowed to access this page')
  }
  next()
}

const isAuthorized = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user 
    if(!allowedRoles.includes(role)) {
      return res.status(403).send('Authorization failed. You are not allowed to access this page')
    }
    next()
  }
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isPremium,
  isAdminOrPremium,
  isAuthorized
}
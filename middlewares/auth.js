const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../models/User')
module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied!' })
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.user.id).select('-password')
    if (!user) {
      return res.status(401).json({ msg: 'No token, authorization denied!' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' })
  }
}

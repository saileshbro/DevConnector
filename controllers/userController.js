const { promisify } = require('util')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
exports.doSignUp = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'User already exists'
          }
        ]
      })
    }
    const avatar = gravatar.url(email, {
      size: '200',
      rating: 'pg',
      default: 'mm'
    })
    user = new User({ name, email, password, avatar })
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    const payload = {
      user: {
        id: user.id
      }
    }
    const token = await promisify(jwt.sign)(payload, process.env.JWT_SECRET, {
      expiresIn: 360000
    })
    return res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
}
exports.doLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid credentials'
          }
        ]
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid credentials'
          }
        ]
      })
    const payload = {
      user: {
        id: user.id
      }
    }
    const token = await promisify(jwt.sign)(payload, process.env.JWT_SECRET, {
      expiresIn: 360000
    })
    return res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
}

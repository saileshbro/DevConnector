const router = require('express').Router()
const auth = require('../../middlewares/auth')
const { doLogin } = require('../../controllers/userController')

const { validateLogin, checkErrors } = require('../../middlewares/validation')

// @route   GET api/auth
// @desc    Text route
// @access  Token
router.get('/', auth, (req, res) => {
  return res.send(req.user)
})

// @route   POST api/auth
// @desc    Register User
// @access  Public
router.post('/', validateLogin, checkErrors, doLogin)
module.exports = router

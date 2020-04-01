const router = require('express').Router()
const { doSignUp } = require('../../controllers/userController')
const { validateSignup, checkErrors } = require('../../middlewares/validation')
// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', validateSignup, checkErrors, doSignUp)
module.exports = router

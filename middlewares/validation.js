const { check, validationResult } = require('express-validator')
exports.validateSignup = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a passsword with six or more characters.'
  ).isLength({ min: 6 })
]
exports.validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please is required').exists()
]
exports.validateMaintainProfile = [
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('skills', 'Skills is required')
    .not()
    .isEmpty()
]
exports.validateExperience = [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('company', 'Company is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty()
]
exports.validateEducation = [
  check('school', 'School is required')
    .not()
    .isEmpty(),
  check('degree', 'Degree is required')
    .not()
    .isEmpty(),
  check('fieldofstudy', 'Field of study is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty()
]
exports.validatePost = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
]
exports.checkErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  } else {
    next()
  }
}

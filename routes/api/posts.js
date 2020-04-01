const router = require('express').Router()
// @route   GET api/posts
// @desc    Text route
// @access  Public
router.get('/', (req, res) => res.send('Posts route'))
module.exports = router

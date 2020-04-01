const router = require('express').Router()
const auth = require('../../middlewares/auth')
const { checkErrors, validatePost } = require('../../middlewares/validation')
const {
  storePost,
  getAllPosts,
  getPostById,
  deletePostById,
  likePost,
  unlikePost,
  storeComment,
  deleteComment
} = require('../../controllers/postController')
// @route   POST api/posts
// @desc    Add post
// @access  Private
router.post('/', auth, validatePost, checkErrors, storePost)

// @route   GET api/posts
// @desc    Get all post
// @access  Private
router.get('/', auth, getAllPosts)

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, getPostById)

// @route   DELETE api/posts/:id
// @desc    DELETE post by id
// @access  Private
router.delete('/:id', auth, deletePostById)

// @route   PUT api/posts/like/:id
// @desc    Link a post
// @access  Private
router.put('/like/:id', auth, likePost)

// @route   PUT api/posts/like/:id
// @desc    Link a post
// @access  Private
router.put('/unlike/:id', auth, unlikePost)

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', auth, validatePost, checkErrors, storeComment)
// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Comment on a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, deleteComment)
module.exports = router

const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
exports.storePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })
    const post = await newPost.save()
    return res.json(post)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Server error')
  }
}
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Server error')
  }
}
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' })
    }
    return res.json(post)
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: 'Post not found!' })
    }
    return res.status(500).send('Server error')
  }
}
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' })
    }
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' })
    await post.remove()
    return res.json({ msg: 'Post removed!' })
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: 'Post not found!' })
    }
    return res.status(500).send('Server error')
  }
}
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // check if user has already liked
    console.log(post)

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked!' })
    }
    post.likes.unshift({
      user: req.user.id
    })
    await post.save()
    return res.json(post.likes)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Server error')
  }
}

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked!' })
    }
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id)
    post.likes.splice(removeIndex, 1)
    await post.save()
    return res.json(post.likes)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Server error')
  }
}

exports.storeComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    post.comments.unshift(newComment)
    await post.save()
    return res.json(post.comments)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Server error')
  }
}
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )
    if (!comment) {
      return res.status(404).send({ msg: 'Comment doesnt exist' })
    }
    if (comment.user.toString() !== req.user.id)
      return res.status(401).send({ msg: 'User not authorized' })

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id)
    post.comments.splice(removeIndex, 1)
    await post.save()
    return res.json(post.comments)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Server error')
  }
}

const Profile = require('../models/Profile')
const User = require('../models/User')
const axios = require('axios')
exports.getCurrentUserProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id
    })
    if (!profile) {
      return res
        .status(400)
        .json({ message: 'There is no profile for this user' })
    }
    profile = profile._doc
    res.json({
      ...profile,
      name: req.user.name,
      avatar: req.user.avatar
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}
exports.maintainUserProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body
  // Build profile obkect
  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim())
  }
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: profileFields
        },
        { new: true }
      )
      return res.json(profile)
    } else {
      profile = new Profile(profileFields)
      await profile.save()
      return res.json(profile)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error!')
  }
}
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}
exports.getProfilebyUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.' })
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)

    res.status(500).send('Server Error')
  }
}
exports.deleteProfileAndCascade = async (req, res) => {
  try {
    // @todo- remove users posts
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // remove user
    await User.findByIdAndRemove({ _id: req.user.id })
    return res.json({ msg: 'user deleted!' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}
exports.addExperienceToProfile = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    profile.experience.unshift(newExp)
    await profile.save()
    return res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}
exports.deleteExperienceFromProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}
exports.addEducationToProfile = async (req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body
  const newedu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    profile.education.unshift(newedu)
    await profile.save()
    return res.json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}
exports.deleteEducationFromProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)
    profile.education.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}
exports.getGithubRepos = async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.github.com/users/${req.params.username}/repos`,
      header: {
        'user-agent': 'node.js'
      },
      params: {
        per_page: 5,
        sort: 'created:asc',
        client_id: process.env.GITHUB_CLIENT,
        client_secret: process.env.GITHUB_SECRET
      }
    }
    const response = await axios.default(options)
    if (response.data.length == 0)
      return res.status(404).json({ msg: 'No github profile found' })
    return res.send(response.data)
  } catch (error) {
    return res.status(500).send('Server Error')
  }
}

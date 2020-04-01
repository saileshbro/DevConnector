const router = require('express').Router()
const auth = require('../../middlewares/auth')
const {
  getCurrentUserProfile,
  maintainUserProfile,
  getAllProfiles,
  getProfilebyUserId,
  deleteProfileAndCascade,
  addExperienceToProfile,
  deleteExperienceFromProfile,
  addEducationToProfile,
  deleteEducationFromProfile,
  getGithubRepos
} = require('../../controllers/profileController')
const {
  validateMaintainProfile,
  checkErrors,
  validateExperience,
  validateEducation
} = require('../../middlewares/validation')

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, getCurrentUserProfile)

// @route   POST api/profile/me
// @desc    Create or update users profile
// @access  Private
router.post(
  '/',
  auth,
  validateMaintainProfile,
  checkErrors,
  maintainUserProfile
)
// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getAllProfiles)

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', getProfilebyUserId)

// @route   DELETE api/profile
// @desc    Delete profile,user & post
// @access  Private
router.delete('/', auth, deleteProfileAndCascade)

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  auth,
  validateExperience,
  checkErrors,
  addExperienceToProfile
)
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, deleteExperienceFromProfile)

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  auth,
  validateEducation,
  checkErrors,
  addEducationToProfile
)
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:exp_id', auth, deleteEducationFromProfile)

// @route   GET /api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', getGithubRepos)
module.exports = router

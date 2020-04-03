import axios from 'axios'
import { setAlert } from './alert'
import {
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from './types'

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
// create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post('/api/profile', formData)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'))
    if (!edit) {
      history.push('/dashboard')
    }
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    console.log(error.response.data.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
// add experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/profile/experience', formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience added!', 'success'))
    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    console.log(error.response.data.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}

// add experience
export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/profile/education', formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Education added!', 'success'))
    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    console.log(error.response.data.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
// delete experience

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience deleted!', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
// delete education

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Education deleted!', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.message,
        status: error.response.status
      }
    })
  }
}
// delete account profile

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!'))
    try {
      await axios.delete('/api/profile')
      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({
        type: ACCOUNT_DELETED
      })
      dispatch(setAlert('Youu account has been permanently deleted'))
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.message,
          status: error.response.status
        }
      })
    }
}

import axios from 'axios'
import { setAlert } from './alert'
import { PROFILE_ERROR, GET_PROFILE } from './types'

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
        msg: error.response.data.message || error.response.data.msg,
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
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

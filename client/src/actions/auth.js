import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types'
import { setAlert } from './alert'

// register user

export const register = ({ name, email, password }) => async dispatch => {
  try {
    const response = await axios.post('/api/users', { name, email, password })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
    dispatch(setAlert('Register successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

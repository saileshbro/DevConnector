import axios from 'axios'
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

// load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

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
// login user
export const login = (email, password) => async dispatch => {
  try {
    const response = await axios.post('/api/auth', { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })
    dispatch(setAlert('Login successfull', 'success'))
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}
// logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}

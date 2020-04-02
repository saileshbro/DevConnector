import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  auth: { isAuthenticated, loading },
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  ></Route>
)
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(PrivateRoute)

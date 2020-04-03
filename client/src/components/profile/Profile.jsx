import React, { memo, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import Experience from './Experience'
import Education from './Education'
import ProfileGithub from './ProfileGithub'

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])
  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back to profiles
      </Link>
      {auth.isAuthenticated &&
        !auth.loading &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit profile
          </Link>
        )}
      <div class='profile-grid my-1'></div>
      <ProfileTop profile={profile} />
      <ProfileAbout profile={profile} />
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Experience</h2>
        {profile.experience.length > 0 ? (
          profile.experience.map(exp => (
            <Experience key={exp._id} experience={exp} />
          ))
        ) : (
          <h4>No experience credentials</h4>
        )}
      </div>
      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'>Education</h2>
        {profile.education.length > 0 ? (
          profile.education.map(exp => (
            <Education key={exp._id} education={exp} />
          ))
        ) : (
          <h4>No education credentials</h4>
        )}
      </div>
      {profile.githubusername && (
        <ProfileGithub username={profile.githubusername} />
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}
export default connect(mapStateToProps, { getProfileById })(Profile)

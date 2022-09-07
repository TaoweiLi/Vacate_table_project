import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SigninFormModal from '../SigninFormModal';
import './Navigation.scss';
import SignupFormModal from '../SignupFormModal';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-signin-state'>
        <ProfileButton user={sessionUser} />
      </div>
      
    )
  } else {
    sessionLinks = (
      <div className='nav-signout-state'>
        <SignupFormModal />
        <SigninFormModal />
        {/* <NavLink to="/signin" className="nav-signin">Sign In</NavLink> */}
        {/* <NavLink to="/signup" className="nav-signup">Sign Up</NavLink> */}
      </div>
    )
  }


  return (
    <>
      <div className="lower-nav-bar">
        <div className="nav-left">
          <a className="nav-logo" href="/">
            <img className="nav-logo-img" src="" alt="Vacate Table Logo"></img>
          </a>
          <div className='nav-location-menu'>
            <i className="fa-solid fa-location-dot"></i>
          </div>
        </div>

        <div className="nav-right">
          <div className='nav-user-state'>{sessionLinks}</div>
          <div className='nav-seach'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;

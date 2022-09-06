import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.scss';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-signout-state'>
        <ProfileButton user={sessionUser} />
      </div>
      
    )
  } else {
    sessionLinks = (
      <div className='nav-signout-state'>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    )
  }



  return (
    <>
      <div className="nav-bar">
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
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;

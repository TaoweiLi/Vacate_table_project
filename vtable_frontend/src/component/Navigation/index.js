import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SigninFormModal from '../SigninFormModal';
import './Navigation.scss';
import SignupFormModal from '../SignupFormModal';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
        <SignupFormModal showSignup ={showSignup} setShowSignin={setShowSignin} setShowSignup={setShowSignup}/>
        <SigninFormModal showSignin={showSignin} setShowSignin={setShowSignin} setShowSignup={setShowSignup} />
        {/* <NavLink to="/signin" className="nav-signin">Sign In</NavLink> */}
        {/* <NavLink to="/signup" className="nav-signup">Sign Up</NavLink> */}
      </div>
    )
  }


  return (
    <>
      <div id="nav-bar-wrapper">
        <div id="top-nav-bar">
          <button id="for-business">For Businesses</button>
          <div id="mobile-button-wrapper">
            <button id="mobile-button" className="button_with_down_arrow">Mobile</button>
          </div>
          <button id="help">Help</button>
          <div id="language-wrapper">
            <button id="language" className="button_with_down_arrow" >EN</button>
          </div>
        </div>

        <div className="lower-nav-bar">
          <div className="nav-left">
            <a className="nav-logo" href="/">
              <img className="nav-logo-img" height="35" src="https://i.postimg.cc/ZKgFN97s/Untitled-drawing-17.png" alt="Vacate Table Logo"></img>
            </a>
            <div className="nav-location-menu">
              <i className="fa-solid fa-location-dot"></i>
              <div className='button_with_down_arrow'></div>
            </div>
          </div>

          <div className="nav-right">
            <div className='nav-user-state'>{sessionLinks}</div>
            <div className='nav-seach'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Navigation;

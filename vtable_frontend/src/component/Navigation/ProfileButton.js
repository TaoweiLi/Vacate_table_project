import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, useParams } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const { userId } = useParams();

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const signout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.signout());
    history.push("/");
  };

  return (
    <>
      <div id="profile-buttons">
        <div id="nav-user-dropdown">
          <button className="nav-user-button" onClick={openMenu}>
            <i className="fa-regular fa-circle-user"></i>
          </button>
          {showMenu && (
            <div id="profile-dropdown">
              <div id="dropdown-title">Hello, {user.firstName}!</div>
              <div id="dropdown-ul">
                <div className="dropdown-text">
                  <a href={`/users/profile`}>My Profile</a>
                </div>
                <div className="dropdown-text">
                  <a href={`/users/profile`}>My Dining History</a>
                </div>
                <div className="dropdown-text">
                  <a href={`/users/profile`}>My Saved Restaurant</a>
                </div>
              </div>
              <button id="sign-out-button" onClick={signout}>Sign Out</button>
            </div>
          )}
        </div>

        <button className="nav-calendar">
          <i className="fa-regular fa-calendar"></i>
        </button>
        <button className="nav-bell">
          <i className="fa-regular fa-bell"></i>
        </button>
      </div>

    </>
  );
}

export default ProfileButton;
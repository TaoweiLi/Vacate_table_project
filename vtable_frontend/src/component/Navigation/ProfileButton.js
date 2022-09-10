import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

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
      <div className="profile-buttons">
        <div id="nav-user-dropdown">
          <button className="nav-user-button" onClick={openMenu}>
            <i className="fa-regular fa-circle-user"></i>
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li>Hello! {user.firstName}</li>
              <li>{user.email}</li>
              <button onClick={signout}>Sign Out</button>
            </ul>
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
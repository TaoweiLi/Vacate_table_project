import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const signout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.signout());
  };

  return (
    <>
      <div className="profile-buttons">
        <button className="nav-user" onClick={openMenu}>
          <i className="fa-regular fa-circle-user"></i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={signout}>Sign Out</button>
            </li>
          </ul>
        )}
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
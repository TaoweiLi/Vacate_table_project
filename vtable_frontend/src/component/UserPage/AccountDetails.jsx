import "./AccountDetails.scss"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function AccountDetails() {
  const sessionUser = useSelector((state) => state.session.user);

  // console.log("debug aaaa", sessionUser)
  return (
    <>
      {sessionUser && (
        <div id="account-page-wrapper">
          <header id="page-header-wrapper">
            <div id="page-header-container">
              <h1 id="header-title">{sessionUser.firstName} {sessionUser.lastName}</h1>
            </div>
          </header>

          <div id="page-detail-wrapper">
            <nav id="user-nav-bar-wrapper">
              <ul id="nav-bar-list-container">
                <li className="nav-bar-list">
                  <a href="/users/profile">Reservations</a>
                </li>
                <li className="nav-bar-list">
                  <a href="/users/profile/account">Account Details</a>
                </li>
              </ul>
            </nav>

            <div id="user-account-wrapper">
              <div id="user-account-container">
                <form id="user-account-detail">
                  <h2 id="user-header">About me</h2>

                  <div id="user-name-wrapper">
                    <div id="fname-container">
                      <label id="fname-title" htmlFor="fName">First name</label>
                      <div id="fname-form">
                        <input id="fName" placeholder="First name" value={sessionUser.firstName} readOnly></input>
                      </div>
                    </div>

                    <div id="lname-container">
                      <label id="lname-title" htmlFor="lName">Last name</label>
                      <div id="lname-form">
                        <input id="lName" placeholder="last name" value={sessionUser.lastName} readOnly></input>
                      </div>
                    </div>
                  </div>

                  <div id="email-wrapper">
                    <div id="email-container">
                      <label id="email-title" htmlFor="email">Email address</label>
                      <div id="email-form">
                        <input id="email" placeholder="Email address" value={sessionUser.email} readOnly></input>
                      </div>
                    </div>
                  </div>

                  <div id="phone-wrapper">
                    <div id="phone-container">
                      <label id="phone-title" htmlFor="phone">Phone</label>
                      <div id="phone-form">
                        <input id="phone" placeholder="Phone" value={sessionUser.phoneNumber} readOnly></input>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AccountDetails;
import "./UserPage.scss"
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import restaurantsReducer, { getRestaurant, fetchRestaurants } from '../../store/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getReservation, getReservations, fetchUserReservations, createReservation, updateReservation, deleteReservation } from "../../store/reservations";
import UserReservationIndexItem from "./UserReservationIndexItem.jsx";

function User() {
  const reservations = useSelector((state) => getReservations(state))
  const sessionUser = useSelector(state => state.session.user);
  

  const dispatch = useDispatch();

  // console.log("debug  aaaa", reservations)
  // console.log("debug  bbbb", restaurantId)

  useEffect(() => {
    dispatch(fetchUserReservations(sessionUser.id));
  }, [dispatch])

  // useEffect(()=>{
  //   dispatch(fetchRestaurants())
  // }, [dispatch])

  return (
    <>
      <div id="user-page-wrapper">
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
                <a href="">Account Details</a>
              </li>
            </ul>
          </nav>

          <div id="reservation-list-wrapper">
            <div id="reservation-list-container">
              <h2 id="upcoming-header">Upcoming reservations</h2>
              <ol id="review-list-wrapper">
                {reservations.map(reservtaion => (<UserReservationIndexItem key={reservtaion.id} reservtaion={reservtaion} restaurantId={reservtaion.restaurantId} />))}
              </ol>


            </div>
          </div>
        </div>



      </div>




      <p>Under Construction. Comming Soon....</p>
      <p>{JSON.stringify(sessionUser, null, 4)}</p>
      <p>{JSON.stringify(reservations, null, 4)}</p>
    </>
  )
}

export default User;
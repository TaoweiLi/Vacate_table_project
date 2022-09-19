import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import { useEffect } from 'react';
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { deleteReservation } from "../../store/reservations";
import { useHistory } from 'react-router-dom';

function UserReservationIndexItem(props) {
  const reservation = props.reservation
  const restaurantId = reservation.restaurantId;
  const restaurant = useSelector(getRestaurant(restaurantId));
  const history = useHistory();

  const dispatch = useDispatch();
  // const currentRestaurantId = reservation.restaurantId
  // const currentRestaurant = restaurants.currentRestaurantId

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId))
  }, [dispatch, restaurantId])

  function handleUpdateSubmit(e) {
    e.preventDefault();
    history.push(`/restaurants/${restaurantId}?updateReservationId=${reservation.id}`);
  }

  function handleCancelSubmit(e) {
    e.preventDefault();
    dispatch(deleteReservation(reservation.id));
  }

  return (
    <>
      {restaurant && (
        <a id="restaurant-link-wrapper" href="">
          <img id="restaurant-img" src={restaurant.img}></img>
          <div id="reserv-details-wrapper">
            <div id="restaurant-name">{restaurant.name}</div>
            <div id="confirmation-bar">
              <i id="circle-check-mark" className="fa-solid fa-circle-check"></i>
              Reservation confirmed
            </div>
            <div id="reserv-details">
              <div id="person-container">
                <i className="fa-regular fa-user"></i>
                <span>{reservation.partySize}</span>
              </div>
              <div id="date-container">
                <i className="fa-regular fa-calendar"></i>
                <span>{reservation.date} at {reservation.time}</span>
              </div>
            </div>
            <div id="update-cancel-wrapper">
              <button id="update-button" onClick={handleUpdateSubmit}>Update Reservation</button>
              <button id="cancel-button" onClick={handleCancelSubmit}>Cancel Reservation</button>
            </div>
          </div>
        </a>
      )}
    </>
  )
}

export default UserReservationIndexItem;
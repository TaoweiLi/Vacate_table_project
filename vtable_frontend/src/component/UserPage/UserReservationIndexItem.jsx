import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import { useEffect } from 'react';
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { useParams } from 'react-router-dom';

function UserReservationIndexItem({ reservtaion }) {
  const restaurantId = reservtaion.restaurantId;
  const restaurant = useSelector(getRestaurant(restaurantId));

  const dispatch = useDispatch();
  // const currentRestaurantId = reservtaion.restaurantId
  // const currentRestaurant = restaurants.currentRestaurantId

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId))
  }, [dispatch, restaurantId])

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
                <span>{reservtaion.partySize}</span>
              </div>
              <div id="date-container">
                <i className="fa-regular fa-calendar"></i>
                <span>{reservtaion.date}at{reservtaion.time}</span>
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  )
}

export default UserReservationIndexItem;
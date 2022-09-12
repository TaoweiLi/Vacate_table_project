import restaurantsReducer from "../../store/restaurants";
import RestaurantShow from "../RestaurantShow";
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import "./RestaurantReservation.scss";

function RestaurantReservation(props) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector(getRestaurant(restaurantId));

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch, restaurantId])

  let params = (new URL(document.location)).searchParams;
  let partySize = params.get('partySize');
  let date = params.get('date'); 
  let time =params.get('time');

  return (
    <>
      {restaurant && (
      <div id="reserv-main-wrapper">
        <div id="reserv-main-container">
          <div id="reserv-main-content">
            <section id="reserv-right">
              <h2 id="reserv-text">You’re almost done!</h2>
              <div id="reserv-info-wrapper">
                <div id="res-img-container">
                  <img id="res-img" src="" alt="restaurant img."></img>
                </div>
                <div id="reserv-info-container">
                  <a id="restaurant-name-container" href={`/restaurants/${restaurantId}`}>
                    <h2 id="restaurant-name">{restaurant.name}</h2>
                  </a>
                  <div id="reserv-detail-wrapper">
                    <div id="date-container">
                      <p>{date}</p>
                    </div>
                    <div id="time-container">
                      <p>{time}</p>
                    </div>
                    <div id="person-container">
                      <p>{partySize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div></div>
          </div>
        </div>
      </div>
      )}
      {/* <h1>{partySize}</h1> */}
    </>
  )
}

export default RestaurantReservation;
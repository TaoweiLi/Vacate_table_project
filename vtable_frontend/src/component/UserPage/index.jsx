import "./UserPage.scss"
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getReservation, getReservations, fetchUserReservations, createReservation, updateReservation, deleteReservation } from "../../store/reservations";


function User() {

  const reservations = useSelector((state) => getReservations(state))
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchUserReservations(sessionUser.id));
  }, [dispatch])

  return (
    <>
      <p>Under Construction. Comming Soon....</p>
      <p>{JSON.stringify(reservations, null, 4)}</p>
    </>
  )
}

export default User;
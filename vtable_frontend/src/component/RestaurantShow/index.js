import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./RestaurantShow.scss"
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';

function RestaurantShow() {
  const {restaurantId} = useParams();
  const restaurant = useSelector(getRestaurant(restaurantId));
  const dispatch = useDispatch()
  
  useEffect (() => {
    dispatch (fetchRestaurant(restaurantId));
  }, [dispatch])

  console.log(restaurant)

  return (
    <>
      <h1>RestaurantShow Placeholder</h1>
      <p>{JSON.stringify(restaurant, null, 4)}</p>
    </>
  )
}

export default RestaurantShow;
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import "./RestaurantCard.scss"
import { Rating } from "@mui/material";
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantReviews, getRestaurantReviews } from '../../store/reviews';

export default function RestaurantCard({ restaurant }) {
  // const { restaurantId } = useParams();
  // const reviews = useSelector((state) => getRestaurantReviews(state, restaurantId));
  // const restaurant_id = restaurant["id"];
  // let star = reviews["restaurant_id"]["rating"];

  return (
    <>
      <div id="card-section">
        {/* <div id="horizontal-scroll-container"> */}
        {/* <ul> */}
        <div id="card-container">
          <a id="card-link" href={`/restaurants/${restaurant.id}`}>
            <Card id="card-wrapper" sx={{ maxWidth: 236 }}>
              <CardMedia
                id="card-img" component="img" image={restaurant.img} alt={restaurant.name}
              />
              <CardContent id="card-content-wrapper">
                <h3 id="card-res-name">{restaurant.name}</h3>
                <div id="card-res-rating">
                  <div id="card-res-stars">
                    <Rating
                      name="read-only"
                      value={[3, 3.5, 4, 4.5, 5][Math.floor(Math.random() * 5)]}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div id="card-res-reviews">{Math.floor(Math.random() * 298) + 101} reviews</div>
                </div>
                <div id="card-res-info">
                  <div id="card-res-cuisine"> {restaurant.cuisine}</div>
                  <div id="card-res-expense"> {restaurant.expense}</div>
                  <div id="card-res-neighborhood"> {restaurant.neighborhood}</div>
                </div>

              </CardContent>

              <CardActions id="reservation-button">
                <div>
                  <button id="home-resev-button" size="small">Reservation</button>
                </div>
              </CardActions>
            </Card>
          </a>
        </div >
        {/* </ul> */}
        {/* </div> */}
      </div >
    </>
  );
}

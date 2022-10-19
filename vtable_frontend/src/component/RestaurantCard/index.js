import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "./RestaurantCard.scss"
import { Rating } from "@mui/material";
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateReview, fetchReviewsByRestaurantId, getReviewsByResId, createReview } from "../../store/reviews";
import { useEffect, useState } from 'react';
import ReviewIndexItem from '../RestaurantReview/ReviewIndexItem';

export default function RestaurantCard({ restaurant }) {
  // const restaurantId = restaurant.id;
  // const dispatch = useDispatch();
  // const reviews = useSelector(getReviewsByResId(restaurantId));

  // useEffect(() => {
  //   dispatch(fetchReviewsByRestaurantId(restaurantId));
  // }, [])

  // if (!reviews) {
  //   return null;
  // }

  return (
    <>
        <div className="card-section">
          {/* <div id="horizontal-scroll-container"> */}
          {/* <ul> */}
          <div className="card-container">
            <a className="card-link" href={`/restaurants/${restaurant.id}`}>
              <Card className="card-wrapper" sx={{ maxWidth: 236 }}>
                <CardMedia
                  className="card-img" component="img" image={restaurant.img} alt={restaurant.name}
                />
                <CardContent className="card-content-wrapper">
                  <h3 className="card-res-name">{restaurant.name}</h3>
                  <div className="card-res-rating">
                    <div className="card-res-stars">
                      <Rating
                        name="read-only"
                        value={restaurant.scoreAvg}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  <div className="card-res-reviews">{restaurant.reviewNumber} reviews</div>
                  </div>
                  <div className="card-res-info">
                    <div className="card-res-cuisine"> {restaurant.cuisine}</div>
                    <div className="card-res-expense"> {restaurant.expense}</div>
                    <div className="card-res-neighborhood"> {restaurant.neighborhood}</div>
                  </div>
                </CardContent>

                <CardActions className="reservation-button">
                  <div>
                    <button className="home-resev-button" size="small">Reserve</button>
                  </div>
                </CardActions>

              </Card>
            </a>
          </div >
        </div >
    </>
  );
}

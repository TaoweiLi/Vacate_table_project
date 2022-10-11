import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "./RestaurantCard.scss"
import { Rating } from "@mui/material";

export default function RestaurantCard({ restaurant }) {

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
                  <div className="card-res-reviews">{Math.floor(Math.random() * 298) + 101} reviews</div>
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

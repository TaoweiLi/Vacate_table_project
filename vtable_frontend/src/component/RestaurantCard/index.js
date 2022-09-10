// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PhoneIcon from '@mui/icons-material/Phone';


// function RestaurantCard({ restaurant }) {

//   return (
//     <>
//       <div id="horizontal-scroll">
//         <ul>
//           <div id="each-card-list">
//             <a href="">
//               <Card id="card-wrapper" sx={{ maxWidth: 236 }} >
//                 <CardMedia id="card-img" component="img" image={restaurant.img} alt={restaurant.name}/>

//                 <CardContent id="card-content">
//                   <h3 id="card-res-name">{restaurant.name}</h3>
//                   <div id="card-res-rating">
//                     <span class="fa fa-star checked"></span>
//                     <span class="fa fa-star checked"></span>
//                     <span class="fa fa-star checked"></span>
//                     <span class="fa fa-star"></span>
//                     <span class="fa fa-star"></span>
//                   </div>
//                   <div id="card-res-cuisine"></div>

//                 </CardContent>

//                 <CardActions >
//                   <IconButton>
//                     <FavoriteIcon />
//                   </IconButton>
//                   <IconButton>
//                     <PhoneIcon />
//                   </IconButton>
//                 </CardActions>
//               </Card>


//             </a>
//           </div>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default RestaurantCard;


import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./RestaurantCard.scss"

export default function RestaurantCard({ restaurant }) {
  return (
    <>
      <div id="card-section">
        {/* <div id="horizontal-scroll-container"> */}
          {/* <ul> */}
            <div id="card-container">
              <a href={`/restaurants/${restaurant.id}`}>
                <Card id="card-wrapper" sx={{ maxWidth: 236 }}>
                  <CardMedia
                    id="card-img" component="img" image={restaurant.img} alt={restaurant.name}
                  />
                  <CardContent id="card-content-wrapper">
                    <h3 id="card-res-name">{restaurant.name}</h3>
                    <div id="card-res-rating">
                      <div id="card-res-stars">
                        <div className="fa fa-star checked"></div>
                        <div className="fa fa-star checked"></div>
                        <div className="fa fa-star checked"></div>
                        <div className="fa fa-star"></div>
                        <div className="fa fa-star"></div>
                      </div>
                      <div id="card-res-reviews">200 reviews</div>
                    </div>
                    <div id="card-res-info">
                      <div id="card-res-cuisine"> {restaurant.cuisine}</div>
                      <div id="card-res-expense"> {restaurant.expense}</div>
                      <div id="card-res-neighborhood"> {restaurant.neighborhood}</div>
                    </div>

                  </CardContent>
                  <CardActions>
                    <div id="reservation-button">
                      <Button size="small">Reservation</Button>
                    </div>

                    {/* <Button size="small">Learn More</Button> */}
                  </CardActions>
                </Card>
              </a>
            </div>
          {/* </ul> */}
        {/* </div> */}
      </div>
    </>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';

export default function RestaurantCard({ restaurant }) {

  return (
    <Card sx={{ maxWidth: 236 }} >

      <CardMedia
        component="img"
        image={restaurant.img}
        alt="Paella dish"
      />
      <CardContent >
        <h4>{restaurant.name}</h4>
        <Typography variant="body2" color="text.secondary">
          4.5 Starts 2000 reviews
        </Typography>
      </CardContent>
      <CardActions >
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <PhoneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
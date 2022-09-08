import "./RestaurantsCategory.scss"
import RestaurantCard from "../RestaurantCard";
import * as restaurantsActions from '../../store/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRestaurants } from '../../store/restaurants';

function RestaurantsCategory({ title, tag }) {
  const restaurants = useSelector(getRestaurants)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restaurantsActions.fetchRestaurants())
  }, [dispatch])


  return (
    <>
      <div className="res-category">
        <section className="blank-area">
          <header className="category-header">
            <h2 className="category-header-text">{title}</h2>
          </header>
          <div className="res-cards">
            {restaurants.map(res => <RestaurantCard key={res.id} restaurant={res} />)}
          </div>
        </section>

      </div>
    </>
  )
}

export default RestaurantsCategory;
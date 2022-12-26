import "./RestaurantsCategory.scss"
import RestaurantCard from "../RestaurantCard";
// import * as restaurantsActions from '../../store/restaurants';
import { fetchTaggedRestaurants } from '../../store/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTaggedRestaurants } from '../../store/restaurants';

// query restuarants with same tag
// {title, tag} == props ---if parameters too many, better use props
function RestaurantsCategory( {title, tag }) {
  const restaurants = useSelector((state) => getTaggedRestaurants(state, tag))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTaggedRestaurants(tag))
  }, [dispatch, tag])

  return (
    <>
      <div className="res-category-wrapper">
        <section className="blank-area">
          <header className="res-category-header">
            <h2 className="res-category-header-text">{title}</h2>
          </header>
          <div className="res-category-container">
            {restaurants.map(res => <RestaurantCard key={res.id} restaurant={res} tag={tag}/>)}
          </div>
        </section>

      </div>
    </>
  )
}

export default RestaurantsCategory;
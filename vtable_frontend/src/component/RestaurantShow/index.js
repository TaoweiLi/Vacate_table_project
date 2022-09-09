import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./RestaurantShow.scss"
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';

function RestaurantShow() {
  const { restaurantId } = useParams();
  const restaurant = useSelector(getRestaurant(restaurantId));
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch])


  return (
    <>
      {/* <div id="show-site-wrapper">
        <div id="show-base-app"></div>
       </div> */}

      {/* <div className="breadcrumb"></div> */}

      <div className="show-main-wrapper">
        <div className="show-banner-wrapper">
          <div className="show-location-bar"></div>
          {/* <div className="show-save-button"></div> */}
          <img className="show-res-img"></img>
        </div>

        <div className="show-res-detail-main-wrapper">
          <div className="res-detail-left">
            <section className="left-nav-bar-wrapper">Restaurant Nav Bar
              <nav className="left-nav-bar">
              </nav>
            </section>
            <section className="left-res-info">
              <section className="left-res-take-out"></section>
              <h1 id="right-res-name">{restaurant.name}</h1>
              <div id="right-res-overview">
                <div>{restaurant.expense}</div>
                <div>{restaurant.cuisine}</div>
              </div>
            </section>
            <section className="left-res-photos">Restaurant Photos</section>
            <section className="letf-res-menu">Menu</section>
            <section className="left-res-review">Review</section>
          </div>


          <div className="res-detail-right">
            <div className="right-bookable-wrapper">
              <div className="right-reservation-wrapper"></div>
              <div className="right-oreder-wrapper"></div>
            </div>

            <section className="right-res-detail-wrapper">
              <div className="right-google-map"></div>
              <div className="right-res-additional-info">
                <h4 className="additional-info-title">Additional information</h4>
                <div className="additional-info-container">
                  <ul className="additional-info-list">
                    <li className="ai-list"></li>
                    <li className="ai-list"></li>
                    <li className="ai-list"></li>
                    <li className="ai-list"></li>
                    <li className="ai-list"></li>
                  </ul>
                  <div id="view-more">
                    <button id="view-more-button">+ View more</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <p>{JSON.stringify(restaurant, null, 4)}</p>
    </>
  )
}

export default RestaurantShow;
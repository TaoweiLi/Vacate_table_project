import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./RestaurantShow.scss"
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { fetchRestaurantReviews, getRestaurantReviews } from '../../store/reviews';
import React from 'react';

function RestaurantShow() {
  const { restaurantId } = useParams();
  const restaurant = useSelector(getRestaurant(restaurantId));
  const reviews = useSelector((state) => getRestaurantReviews(state, restaurantId));
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch, restaurantId])

  useEffect(() => {
    dispatch(fetchRestaurantReviews(restaurantId));
  }, [dispatch, restaurantId])

  var hashMonth = {
    '1': '01',
    '2': '02',
    '3': '03',
    '4': '04',
    '5': '05',
    '6': '06',
    '7': '07',
    '8': '08',
    '9': '09',
    '10': '10',
    '11': '11',
    '12': '12'
  }


  const todayDay = new Date().toDateString().slice(8, 10);
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().toDateString().slice(11);

  const initialState = {
    "restaurant": restaurant,
    "partySize": 2,
    "date": `${todayYear}-${hashMonth[todayMonth]}-${todayDay}`,
    "time": "11:00"
  }

  const [partySize, setPartySize] = useState(initialState.partySize)
  const [date, setDate] = useState(initialState.date);
  const [time, setTime] = useState(initialState.time);

  function handleChange(field) {
    return (event) => {
      switch (field) {
        case "partySize":
          setPartySize(event.currentTarget.value);
          break;
        case "date":
          setDate(event.currentTarget.value);
          break;
        case "time":
          setTime(event.currentTarget.value);
          break;
        default:
          console.error("Field name error");
          break;
      }
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    history.push({
      pathname: `/restaurants/${restaurant.id}/reservation`,
      search: `?partySize=${partySize}&date=${date}&time=${time}`,
    }); 
  }

  return (
    <>
      {
      /* <div id="show-site-wrapper">
        <div id="show-base-app"></div>
       </div> */}
      <div className="breadcrumb"></div>

      {restaurant && (
        <main className="show-main-wrapper">
          <div className="show-banner-wrapper">
            <div className="show-location-bar"></div>
            {/* <div className="show-save-button"></div> */}
            <img className="show-res-img" src={restaurant.photoUrl}></img>
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
                  <div>restaurant.expense</div>
                  <div>restaurant.cuisine</div>
                </div>
              </section>
              <section className="left-res-photos">Restaurant Photos</section>
              <section className="letf-res-menu">Menu</section>
              <section className="left-res-review">Review</section>
            </div>


            <div className="res-detail-right">
              <div className="right-bookable-wrapper">
                <div className="right-reservation-wrapper">

                  <form onSubmit={handleSubmit}>
                    <label for="fname">Party Size</label><br></br>
                    <input type="text" id="fname" value={partySize} onChange={handleChange("partySize")} /><br></br>
                    <label for="lname">Date</label><br></br>
                    <input type="text" id="lname" value={date} onChange={handleChange("date")} /><br></br>
                    <label for="lname">Time</label><br></br>
                    <input type="text" id="lname" value={time} onChange={handleChange("time")} />
                    <input type="submit" value="Find a time" />
                  </form>

                </div>
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
        </main>
      )}
      <p>{JSON.stringify(restaurant, null, 4)}</p>
      <p>{JSON.stringify(reviews, null, 4)}</p>
    </>

  )
}

export default RestaurantShow;
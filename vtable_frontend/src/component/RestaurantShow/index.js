import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./RestaurantShow.scss"
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { fetchRestaurantReviews, getRestaurantReviews } from '../../store/reviews';
import React from 'react';
import RestaurantReview from '../RestaurantReview';

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
      <div className="breadcrumb"></div>

      {restaurant && (
        <main className="show-main-wrapper">
          <div className="show-banner-wrapper">
            <div className="show-location-bar"></div>
            {/* <div className="show-save-button"></div> */}
            <img className="show-res-img" src={restaurant.img}></img>
          </div>

          <div className="show-res-detail-main-wrapper">
            <div id="res-detail-left">
              <section id="left-nav-bar-wrapper">
                <nav className="left-nav-bar">
                  <ol className="nav-list">
                    <li className="nav-buttons">
                      <button className="nav-button">Overview</button>
                    </li>
                    <li className="nav-buttons">
                      <button className="nav-button">Photos</button>
                    </li>
                    <li className="nav-buttons">
                      <button className="nav-button">Menu</button>
                    </li>
                    <li className="nav-buttons">
                      <button className="nav-button">Review</button>
                    </li>

                  </ol>
                </nav>
              </section>

              <section id="left-oview-wrapper">
                <h1 id="res-name">{restaurant.name}</h1>
                <div id="res-overview">
                  <div><i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    {reviews.rating}
                  </div>
                  <div><i className="fa-solid fa-money-bill"></i> {restaurant.expense}</div>
                  <div><i className="fa-solid fa-utensils"></i> {restaurant.cuisine}</div>
                </div>
                <div id="res-description">
                  <div id="res-description-container">
                    <div id="res-description-detail">{restaurant.description}</div>
                  </div>
                  <div id="res-readmore">
                    <button id="res-readmore-button">+ Read more</button>
                  </div>
                </div>
              </section>

              <section id="left-menu-wrapper">
                <h2 id="menu-header">Menu</h2>
                <a id="res-web-wrapper" href={restaurant.website}>
                  <i id="web-icon" className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span id="web-text">View menu on restaurant's website</span>
                </a>
              </section>

              <section id="left-review-wrapper">

                <h2 id="res-review-header">Review
                  <button id="review-button">Write a review</button>
                </h2>

                <ol id="review-list-wrapper">
                  {/* {reviews.map(review => <RestaurantReview key={restaurant.id} review={review} />)} */}
                  <li id="review-content">
                    <section id="reviewer-info">user_id: {reviews.user_id}</section>
                    <section id="review-details">
                      <div>Rating: {reviews.rating}</div>
                      <div>{reviews.review}</div>
                    </section>
                  </li>
                </ol>
              </section>
            </div>

            <div id="res-detail-right">
              <div id="right-reserv-wrapper">
                <div id="right-reserv-container">
                  <h4 id="right-reserv-header">Make a reservation</h4>
                  <form id="reserv-form" onSubmit={handleSubmit}>
                    <label className="reserv-header" htmlFor="party-size">Party Size</label>
                    <input className="reserv-input" id="party-size" value={partySize} onChange={handleChange("partySize")} />

                    <label className="reserv-header" htmlFor="date">Date</label>
                    <input className="reserv-input" id="date" value={date} onChange={handleChange("date")} />

                    <label className="reserv-header" htmlFor="time">Time</label>
                    <input className="reserv-input" id="time" value={time} onChange={handleChange("time")} />


                    {/* <div id="ps-wrapper">
                      <div className="ps-select-wrapper">
                        <select className="ps-select-dropdown" id="ps-select">
                          <option value="1">1 person</option>
                          <option value="2">2 person</option> */}
                    {/* <option value="3">3 person</option>
                          <option value="4">4 person</option>
                          <option value="5">5 person</option>
                          <option value="6">6 person</option>
                          <option value="7">7 person</option>
                          <option value="8">8 person</option>
                          <option value="9">9 person</option>
                          <option value="10">10 person</option>
                        </select>
                      </div>
                    </div> */}

                    {/* <div id="dt-wrapper">
                      <div id="date-wrapper">
                        <div className="date-select-wrapper">
                          <select className="date-select-dropdown" id="date-select">
                          </select>
                        </div>
                      </div> */}

                    {/* <div id="time-wrapper">
                        <label className="time-select-header" htmlFor="time-select">Time</label>
                        <input type="text" id="partySize" value={partySize} onChange={handleChange("partySize")} /><br></br>
                        <div className="time-select-wrapper">
                          <select className="time-select-dropdown" id="time-select">
                            <option value="2000-02-01T00:00:00">12:00 AM</option>
                            <option value="2000-02-01T00:30:00">12:30 AM</option>
                            <option value="2000-02-01T01:00:00">1:00 AM</option>
                            <option value="2000-02-01T01:30:00">1:30 AM</option>
                          </select>
                        </div>
                      </div>
                    </div> */}

                    <button id="reserv-button">Find a time</button>
                  </form>

                </div>
              </div>

              <section id="right-res-info-wrapper">
                <div id="right-res-info-container">
                  <section id="right-google-map">
                    <p>Google map</p>
                    <div id="res-address-wrapper"><i className="fa-solid fa-location-dot"></i> {restaurant.address}</div>
                  </section>

                  <div id="right-additional-info-wrapper">
                    <h4 className="additional-info-title">Additional information</h4>
                    <div className="additional-info-container">
                      <ul className="additional-info-list">
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-regular fa-building"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Neighborhood</div>
                              <div className="ai-info-content">{restaurant.neighborhood}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-regular fa-clock"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Hours of operation</div>
                              <div className="ai-info-content">{restaurant.operation_hours}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-utensils"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Cuisine</div>
                              <div className="ai-info-content">{restaurant.cuisine}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-landmark-dome"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Dining style</div>
                              <div className="ai-info-content">{restaurant.dining_style}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-user-tie"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Dress code</div>
                              <div className="ai-info-content">{restaurant.dress_code}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-square-parking"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Parking details</div>
                              <div className="ai-info-content">{restaurant.parking_details}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-square-parking"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Payment options</div>
                              <div className="ai-info-content">{restaurant.payment_options}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Website</div>
                              <div className="ai-info-content">{restaurant.website}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Phone Number</div>
                              <div className="ai-info-content">{restaurant.phone_number}</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div id="view-more">
                        <button id="view-more-button">+ View more</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      )}

      {/* <p>{JSON.stringify(restaurant, null, 4)}</p>
      <p>{JSON.stringify(reviews, null, 4)}</p> */}
      <p></p>
    </>

  )
}

export default RestaurantShow;
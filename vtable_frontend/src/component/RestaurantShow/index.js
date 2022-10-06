import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./RestaurantShow.scss"
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { updateReview, fetchReviews, getReviewsByResId, createReview } from "../../store/reviews";
import React from 'react';
import Map from '../GoogleMap/Map';
import ReviewIndexItem from '../RestaurantReview/ReviewIndexItem';
import { Rating } from "@mui/material";
import { fetchReservation, getReservation } from '../../store/reservations';
import { HashLink as Link } from 'react-router-hash-link';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function RestaurantShow() {
  const { restaurantId } = useParams();
  const restaurant = useSelector(getRestaurant(restaurantId));
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector(getReviewsByResId(restaurantId));
  const [isUpdateReview, setIsUpdateReview] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [updateReservationId, setUpdateReservationId] = useState(null);

  const reviewData = {
    body: "",
    rating: 0,
    restaurant_id: restaurantId,
    user_id: ""
  }

  const [review, setReview] = useState(reviewData);

  const location = {
    address: restaurant?.address,
    lat: restaurant?.lat,
    lng: restaurant?.lng,
  }

  // Check and set if the current page support update an reservation
  let isUpdateReservation = false;
  const params = (new URL(document.location)).searchParams;
  const updateReservationIdVal = params.get('updateReservationId');
  if (updateReservationIdVal) {
    isUpdateReservation = true;
  }

  useEffect(
    () => {
      if (isUpdateReservation) {
        setUpdateReservationId(updateReservationIdVal)

      }
    }, []
  )

  useEffect(
    () => {
      if (updateReservationId) {
        dispatch(fetchReservation(updateReservationId));
      }
    }, [updateReservationId]
  )

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId)).catch((e) => history.push("/error") );
    dispatch(fetchReviews(restaurantId));
  }, [dispatch, restaurantId])

  let initialState = {
    "restaurant": restaurant,
    "partySize": 2,
    "date": new Date(),
    "time": "11:30 AM"
  }

  const updateReservation = useSelector(getReservation(updateReservationId));
  const [partySize, setPartySize] = useState(initialState.partySize)
  const [date, setDate] = useState(initialState.date);
  const [time, setTime] = useState(initialState.time);

  useEffect(() => {
    if (updateReservation) {
      // pre-set existing reservation info
      setPartySize(updateReservation.partySize)
      setDate(new Date(updateReservation.date + "T12:00:00"));
      setTime(updateReservation.time);
    }
  }, [updateReservation])

  function handlePartySizeChange(event) {
    setPartySize(event.currentTarget.value);
  }

  function handleTimeChange(event) {
    setTime(event.currentTarget.value);
  }

  function handleReservSubmit(e) {
    e.preventDefault();
    const formattedDate = date.toISOString().split("T")[0];
    if (sessionUser) {
      let searchString = `?partySize=${partySize}&date=${formattedDate}&time=${time}`
      if (isUpdateReservation && updateReservation) {
        searchString += `&updateReservationId=${updateReservation.id}`
      }
      history.push({
        pathname: `/restaurants/${restaurant.id}/reservation`,
        search: searchString,
      });
    } else {
      document.getElementById("signinModal").click();
    }
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (sessionUser) {
      const newReview = { ...review, user_id: sessionUser.id }
      dispatch(createReview(newReview)).then(async (res) => {
        setReview(reviewData);
      }).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data.message]);
        else setErrors([res.statusText]);
        return
      });
    } else {
      document.getElementById("signinModal").click();
    }
  }

  function handleReviewUpdateSubmit(e) {
    e.preventDefault();
    dispatch(updateReview(review)).then(async (res) => {
      setIsUpdateReview(false);
      setReview(reviewData);
    }).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data.message]);
      else setErrors([res.statusText]);
      return
    });
  }

  function onUpdateReview(review) {
    if (review) {
      setReview(review);
      setIsUpdateReview(true);
    } else {
      setReview(reviewData);
      setIsUpdateReview(false);
    }
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
                      {/* <button className="nav-button">Overview</button> */}
                      {/* <a className="nav-button" href="#left-oview-wrapper">Overview</a> */}
                      <Link className="nav-button" smooth to="#left-oview-wrapper">Overview</Link>
                    </li>
                    {/* <li className="nav-buttons"> */}
                    {/* <button className="nav-button">Photos</button> */}
                    {/* </li> */}
                    <li className="nav-buttons">
                      {/* <button className="nav-button">Menu</button> */}
                      {/* <a className="nav-button" href="#left-menu-wrapper">Menu</a> */}
                      <Link className="nav-button" smooth to="#left-menu-wrapper">Menu</Link>
                    </li>
                    <li className="nav-buttons">
                      {/* <button className="nav-button">Review</button> */}
                      <Link className="nav-button" id="nav-button-review" smooth to="#left-review-wrapper">Review</Link>
                    </li>

                  </ol>
                </nav>
              </section>

              <section id="left-oview-wrapper">
                <h1 id="res-name">{restaurant.name}</h1>
                <div id="res-overview">
                  <div className="res-overview-rating">
                    <Rating
                      name="read-only"
                      value={restaurant.scoreAvg}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div><i className="fa-solid fa-money-bill"></i> {restaurant.expense}</div>
                  <div><i className="fa-solid fa-utensils"></i> {restaurant.cuisine}</div>
                </div>
                <div id="res-description">
                  <div id="res-description-container">
                    <div id="res-description-detail">{restaurant.description}</div>
                  </div>
                  {/* <div id="res-readmore">
                    <button id="res-readmore-button">+ Read more</button>
                  </div> */}
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

                </h2>

                <form id="review-container">
                  <div className="error-container-wrapper">
                    <div className="error-container">
                      {errors.map((error) => (
                        <li key={error} className="error">
                          {error}
                        </li>
                      ))}
                    </div>
                  </div>
                  <textarea id="review-texarea" rows="10" cols="40" value={review.body} onChange={e => { setReview({ ...review, body: e.target.value }) }}></textarea>
                  <div id="rating-star">
                    <Rating
                      name="simple-controlled"
                      value={review.rating}
                      onChange={(event, newValue) => {
                        setReview({ ...review, rating: newValue })
                      }}
                      size="large" />
                  </div>
                  {!isUpdateReview && (<button id="review-button" onClick={handleReviewSubmit}>Write a review</button>)}
                  {isUpdateReview && (<button id="review-button" onClick={handleReviewUpdateSubmit}>Update the review</button>)}
                </form>
                <ol id="review-list-wrapper">
                  {reviews.map(review => (<ReviewIndexItem key={review.id} review={review} onUpdateReview={onUpdateReview} />))}
                </ol>
              </section>
            </div>

            <div id="res-detail-right">
              <div id="right-reserv-wrapper">
                <div id="right-reserv-container">
                  <h4 id="right-reserv-header">Make a reservation</h4>
                  <form id="reserv-form" onSubmit={handleReservSubmit}>
                    <label className="reserv-header" htmlFor="ps-wrapper">Party Size</label>
                    <div id="ps-wrapper">
                      <div id="ps-select-wrapper">
                        <select className="reserv-input" id="ps-select" value={partySize} onChange={handlePartySizeChange}>
                          {[...Array(18).keys()].map(i => (<option key={i} value={i + 1} > {i + 1} people</option>))}
                        </select>
                      </div>
                    </div>

                    <label className="reserv-header" htmlFor="date-wrapper">Date</label>
                    <div id="date-wrapper" >
                      <DatePicker className="reserv-input" dateFormat="yyyy-MM-dd" selected={date} onChange={(date) => setDate(date)} />
                      <div id="aaaa">
                        <div className="button_with_down_arrow" id="aabbc"></div>
                      </div>
                    </div>

                    <label className="reserv-header" htmlFor="time-wrapper">Time</label>
                    <div id="time-wrapper">
                      <div id="time-select-wrapper">
                        <select className="reserv-input" id="time-select" value={time} onChange={handleTimeChange}>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="12:30 PM">12:30 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="1:30 PM">1:30 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="2:30 PM">2:30 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="3:30 PM">3:30 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="4:30 PM">4:30 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="5:30 PM">5:30 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="6:30 PM">6:30 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="7:30 PM">7:30 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                          <option value="8:30 PM">8:30 PM</option>
                          <option value="9:00 PM">9:00 PM</option>
                          <option value="9:30 PM">9:30 PM</option>
                          <option value="10:00 PM">10:00 PM</option>
                          <option value="10:30 PM">10:30 PM</option>
                        </select>
                      </div>
                    </div>

                    {!isUpdateReservation && (<button id="reserv-button">Reserve</button>)}
                    {isUpdateReservation && (<button id="update-button">Update Reservation</button>)}
                  </form>

                </div>
              </div>

              <section id="right-res-info-wrapper">
                <div id="right-res-info-container">
                  <section id="right-google-map">
                    <Map className="map" location={location} />
                    <div id="res-address-wrapper">
                      <i className="fa-solid fa-location-dot"></i>
                      <span id="map-address-text">{restaurant.address}</span>
                    </div>
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
                              <div className="ai-info-content">{restaurant.operationHours}</div>
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
                              <div className="ai-info-content">{restaurant.diningStyle}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-user-tie"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Dress code</div>
                              <div className="ai-info-content">{restaurant.dressCode}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-square-parking"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Parking details</div>
                              <div className="ai-info-content">{restaurant.parkingDetails}</div>
                            </div>
                          </div>
                        </li>
                        <li className="ai-list-wrapper">
                          <div className="ai-list-container">
                            <div className="ai-icon"><i className="fa-solid fa-square-parking"></i></div>
                            <div className="ai-info">
                              <div className="ai-info-title">Payment options</div>
                              <div className="ai-info-content">{restaurant.paymentOptions}</div>
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
                              <div className="ai-info-content">{restaurant.phoneNumber}</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      {/* <div id="view-more">
                        <button id="view-more-button">+ View more</button>
                      </div> */}
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
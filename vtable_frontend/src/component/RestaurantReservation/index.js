import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getRestaurant, fetchRestaurant } from '../../store/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import "./RestaurantReservation.scss";
import { getReservation, getReservations, fetchReservation, createReservation, updateReservation, deleteReservation } from "../../store/reservations";


function RestaurantReservation(props) {
  const { restaurantId, reservationId } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector(getRestaurant(restaurantId));
  const sessionUser = useSelector(state => state.session.user);
  const reservations = useSelector((state) => getReservations(state))
  const [reserveCompleted, setReserveCompleted] = useState(false)
  const [reserveCanceled, setReserveCanceled] = useState(false)
  let currentReservationId = reservationId
  // const [currentReservationId, setCurrentReservationId] = useState(reservationId)

  console.log("1111111 ", reservations)

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch, restaurantId])

  let params = (new URL(document.location)).searchParams;
  let partySize = params.get('partySize');
  let date = params.get('date');
  let time = params.get('time');

  if (reservations.length > 0) {
    console.log("AABBA ", reservations)
    currentReservationId = reservations[0].id
  }

  const formType = (currentReservationId ? "Cancel Reservation" : "Create Reservation"); //frontend routes: postId is a wildcard--> useParams()

  let reservation = reservations[0]
  if (formType === "Create Reservation") {
    reservation = {
      date: date,
      time: time,
      party_size: partySize,
      restaurant_id: restaurantId,
      user_id: sessionUser.id,
    }
  }

  useEffect(() => {
    console.log("xxxxxx ", currentReservationId)
    if (currentReservationId) {
      dispatch(fetchReservation(currentReservationId));    // dispatch(fetchPost(postId)).then(res => setPost(res))
    }
  }, [dispatch, currentReservationId])

  // if(!post) return null;

  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  // const [partySize, setPartySize] = useState(0);


  // function handleChange(field) {
  //   return (event) => {
  //     switch (field) {
  //       case "date":
  //         setDate(event.currentTarget.value);
  //         break;
  //       case "time":
  //         setTime(event.currentTarget.value);
  //         break;
  //       case "party_size":
  //         setPartySize(event.currentTarget.value);
  //         break;
  //       default:
  //         console.error("Field content error");
  //         break;
  //     }
  //   } 
  // }



  function handleSubmit(e) {
    e.preventDefault();
    reservation = { ...reservation };
    console.log("Debug   aaaa ", formType)

    if (formType === "Create Reservation") {
      dispatch(createReservation(reservation))
      setReserveCompleted(true)
    } else { // Cancel Reservaction
      dispatch(deleteReservation(currentReservationId))
      setReserveCanceled(true)
    };
  }


return (
  <>
    {restaurant && (
      <div id="reserv-main-wrapper">
        <div id="reserv-main-container">
          <div id="reserv-main-content">

            <section id="reserv-left">
              { reserveCanceled 
                ? (<h2 id="reserv-text">Reservation Cancelled!</h2>)
                : (<h2 id="reserv-text">{reserveCompleted ? "Reservation confirmed!" : "You’re almost done!"} </h2>)
              }
              <div id="reserv-info-wrapper">
                <div id="res-img-container">
                  <img className="res-img" src={restaurant.img} alt="restaurant img."></img>
                </div>
                <div id="reserv-info-container">
                  <a id="restaurant-name-container" href={`/restaurants/${restaurantId}`}>
                    <h2 id="restaurant-name">{restaurant.name}</h2>
                  </a>
                  <div id="reserv-detail-wrapper">
                    <div id="date-container">
                      <i className="fa-regular fa-calendar"></i>
                      <p>{date}</p>
                    </div>
                    <div id="time-container">
                      <i className="fa-regular fa-clock"></i>
                      <p>{time}</p>
                    </div>
                    <div id="person-container">
                      <i className="fa-regular fa-user"></i>
                      <p>{partySize}</p>
                    </div>

                  </div>
                </div>
              </div>

              {!reserveCanceled && (
                <div>
                  <h2 id="form-title">Diner details</h2>
                  <h3 id="user-name">{sessionUser.firstName} {sessionUser.lastName}</h3>
                  <div id="user-info-wrapper">
                    <form id="reserv-form" onSubmit={handleSubmit}>
                      <div id="upper-reserv-form">
                        <input id="reserv-phone-num" placeholder="Phone number" value={sessionUser.phoneNumber} readOnly></input>
                        <input id="reserv-email" placeholder="Email" value={sessionUser.email} readOnly></input>
                      </div>
                      <div id="lower-reserv-form">
                        <select id="occasion" disabled={reserveCompleted ? "disabled" : ""}>
                          <option className="occasion-default" defaultValue="Select an occasion">Select an occasion(optional)</option>
                          <option value="Birthday">Birthday</option>
                          <option value="Anniversary">Anniversary</option>
                          <option value="Date Night">Date Night</option>
                          <option value="Business Meal">Business Meal</option>
                          <option value="Celebration">Celebration</option>
                        </select>
                        <textarea id="special-request" placeholder="Add a special request (optional)" disabled={reserveCompleted ? "disabled" : ""}></textarea>
                      </div>
                      <label id="check-container">
                        <input id="checkbox" type="checkbox" disabled={reserveCompleted ? "disabled" : ""} />
                        <span id="checkmark"></span>
                        Sign me up to receive dining offers and news from this restaurant by email.
                      </label>
                      {reserveCompleted
                        ? (<button id="reserv-button">Cancel Reservation</button>)
                        : (<button id="reserv-button">Complete Reservation</button>)}
                    </form>
                  </div>
                </div>
              )}

              {reserveCanceled && (
                <div>  
                  <p> Reservavtion Cancelled sUCCES </p>
                </div>
               )}
            </section>


            <div id="reserv-right">
              <div id="info-wrapper">
                <h1 id="info-title">What to know before you go</h1>
                <section id="info-content">
                  <h1 id="info-subtitle">Important dining information</h1>
                </section>
                <p id="info-p">
                  We have a 15 minute grace period. Please call us if you are running later than 15 minutes after your reservation time.
                  <br></br>
                  <br></br>
                  We may contact you about this reservation, so please ensure your email and phone number are up to date.
                </p>


              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    {/* <h1>{partySize}</h1> */}
  </>
)
}

export default RestaurantReservation;
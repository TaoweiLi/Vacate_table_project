import { useDispatch, useSelector } from "react-redux";
import { fetchQueryRestaurants, getRestaurants, getQueryRestaurants } from "../../store/restaurants";
import { useHistory, useParams, Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchIndexPage.scss";



function SearchIndexItem(props) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { query } = useParams();
  const resDatas = useSelector((state) => getQueryRestaurants(state, query));
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchQueryRestaurants(query))
  }, [dispatch, query])

  let partySize = document.getElementById("ps-select")?.value;
  let date = document.getElementById("date-select")?.value;
  let time = document.getElementById("time-select")?.value;

  let reservation = {
    date: date,
    time: time,
    party_size: partySize,
    restaurant_id: restaurantId,
    user_id: sessionUser.id,
  }

    function handleReservSubmit(e) {
    e.preventDefault();
    const formattedDate = date.toISOString().split("T")[0];
    if (sessionUser) {
      let searchString = `?partySize=${partySize}&date=${formattedDate}&time=${time}`
      history.push({
        pathname: `/restaurants/${props.res.id}/reservation`,
        search: searchString,
      });
    } else {
      document.getElementById("signinModal").click();
    }
  }
  return (
    <>
      {props.res && (
        <a id="restaurant-link-wrapper" href={`/restaurants/${props.res.id}`}>
          <img id="restaurant-img" src={props.res.img}></img>
          <div id="reserv-details-wrapper">
            <div id="restaurant-name">{props.res.name}</div>
            <div id="res-overview">
              <div><i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                {/* {reviews.rating} */}
              </div>
              <div>{props.res.expense}</div>
              <div>{props.res.cuisine}</div>
              <div>{props.res.neighborhood}</div>
            </div>
            <div id="reserv-details">
              <div id="person-container">
                <i className="fa-regular fa-user"></i>
                <span>{reservation.party_size}</span>
              </div>
              <div id="date-container">
                <i className="fa-regular fa-calendar"></i>
                <span>{reservation.date} at {reservation.time}</span>
              </div>
            </div>
            <div id="update-cancel-wrapper">
              <button id="update-button" onClick={handleReservSubmit}>Make a reservation</button>
            </div>
          </div>
        </a>
      )}
    </>
      
  )
}

export default SearchIndexItem;

import { useDispatch, useSelector } from "react-redux";
import { fetchQueryRestaurants, getRestaurants, getQueryRestaurants } from "../../store/restaurants";
import { useHistory, useParams, Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchIndexPage.scss";
import SearchIndexItem from "./SearchIndexItem.jsx";

function SearchIndexPage() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { query } = useParams();
  const resData = useSelector((state) => getQueryRestaurants(state, query));
  const sessionUser = useSelector(state => state.session.user);

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

  return (
    <>
      <div id="search-page-wrapper">
        <div id="search-page-detail-wrapper">
          <div id="result-list-wrapper">
            <div id="result-list-container">
              <h2 id="result-header">Search Results for "{query}":</h2>
              {resData && (resData.length > 0) ?
                (<ol id="result-list-content">
                  {(resData.map(res => (<SearchIndexItem key={res.id} res={res} restaurantId={res.restaurantId} />)))}
                </ol>) :
                <h1>Sorry, no results found</h1>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchIndexPage;
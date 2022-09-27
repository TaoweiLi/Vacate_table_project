import { useDispatch, useSelector } from "react-redux";
import { fetchQueryRestaurants, getRestaurants, getQueryRestaurants } from "../../store/restaurants";
// import StaticRating from "../StaticRating";
import { useHistory, useParams, Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchIndexPage.scss";



function SearchIndexPage() {
  const dispatch = useDispatch();
  const {query} = useParams()
  const resData = useSelector((state) => getQueryRestaurants(state, query));

  useEffect(() => {
    dispatch(fetchQueryRestaurants(query))
  }, [dispatch, query])

  if (!resData) { return null }

  return (
    <>

      <div className="allindex">

        <div className="leftindex">
          <h1>Search Results:</h1>
          {resData.length > 0 ? resData.map((restaurant, i) => (
            <Link to={`/restaurants/${restaurant.id}`} className="singleres" key={i} >
              <img id="restaurant-img" src={restaurant.img} alt="" width="250vw" height='250vh' />
              <div className="restaurant-wrapper">
                <h1>{i + 1}. {restaurant.name}</h1>
                <div id="res-details-wrapper">
                  <p>Category: {restaurant.tag}</p>
                  <p>Address: {restaurant.address}</p>
                  <p>Cuisine: {restaurant.cuisine}</p>
                  <p>Expense: {restaurant.expense}</p>
                  <p>Neighborhood: {restaurant.neighborhood}</p>
                  <p>Operation Hours: {restaurant.operationHours}</p>
                  <p>Phone Number: {restaurant.phoneNumber}</p>
                </div>
              </div>
            </Link>
          )) : <h1>Sorry, no results found</h1>}
        </div>
        <div></div>

      </div>
      {/* <p>{JSON.stringify(resData, null, 4)}</p> */}
    </>
  )
}

export default SearchIndexPage;
// Footer
// © 2022 GitHub, Inc.
// Footer navigation
// Terms
// Privacy
// Security
// Status
// Docs
// Contact GitHub
// Pricing
// API
// Training
// Blog

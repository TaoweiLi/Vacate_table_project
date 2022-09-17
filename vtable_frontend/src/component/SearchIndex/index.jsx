import { useDispatch, useSelector } from "react-redux";
import { fetchQueryRestaurants, getRestaurants } from "../../store/restaurants";
// import StaticRating from "../StaticRating";
import { useHistory, useParams, Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";



function SearchIndexPage() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const resData = useSelector(getRestaurants);
  const history = useHistory();

  console.log("debug   bbb", resData)
  console.log("debug   aaaa", query)


  useEffect(() => {
    dispatch(fetchQueryRestaurants(query))
  }, [query])

  // get all lat and lng

  if (!resData) { return null }

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`)

  }



  return (
    <>

    <p>Search Index</p>
      <div className="allindex">

        <div className="leftindex">
          <h1>Search Results:</h1>
          {resData.length > 0 ? resData.map((restaurant, i) => (
            <Link to={`/restaurants/${restaurant.id}`} className="singleres" key={i} >
              <img src={restaurant.img} alt="" width="250vw" height='250vh' />
              <div className="reshead">
                <h1>{i + 1}.{restaurant.name}</h1>
                {/* <StaticRating rating={restaurant.averageRating} /> */}
                <p>{restaurant.tag}</p>
              </div>
            </Link>
          )) : <h1>Sorry, no results found</h1>}
        </div>
        <div></div>

      </div>
      <p>{JSON.stringify(resData, null, 4)}</p>
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

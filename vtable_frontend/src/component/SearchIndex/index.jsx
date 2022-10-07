import { useDispatch, useSelector } from "react-redux";
import { fetchQueryRestaurants, getRestaurants, getQueryRestaurants } from "../../store/restaurants";
import { useHistory, useParams, Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchIndexPage.scss";
import SearchIndexItem from "./SearchIndexItem.jsx";

function SearchIndexPage() {
  console.log("DEBUG HERE")
  const dispatch = useDispatch();
  const params = (new URL(document.location)).searchParams;
  const [query, setQuery] = useState(params.get('query'))
  const resData = useSelector((state) => getQueryRestaurants(state, query));

  useEffect(() => {
    dispatch(fetchQueryRestaurants(query))
  }, [dispatch, query])

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

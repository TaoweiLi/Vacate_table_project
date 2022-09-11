import SearchHeader from "../SearchHeader";
import RestaurantsCategory from "../RestaurantsCategory";
import "./RestaurantsIndex.scss";
import restaurantsReducer from "../../store/restaurants";

function RestaurantsIndex() {

  return (
    <>
      <header>
        <SearchHeader />
      </header>
      <section id="main-sections-wrapper">
        <div id="main-sections">
          <section id="current-location-wrapper" >
            <div id="current-location-contetnt">
              <div id="current-location-text">It looks like you're in San Francisco. Not correct?</div>
              <div id="current-location-buttons">
                <div id="current-location-arrow">
                  <i className="fa-solid fa-location-arrow"></i>
                </div>
                <div id="current-location-link">
                  <div>Get current location</div>
                </div>
              </div>
            </div>
            <div><RestaurantsCategory title={"New to VacateTable"} tag={"new_to_vtable"} /></div>
            <div><RestaurantsCategory title={"Order takeout"} tag={"order_takeout"} /></div>
            <div><RestaurantsCategory title={"Award Winning"} tag={"award_winning"} /></div>
          </section>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  )

}

export default RestaurantsIndex;
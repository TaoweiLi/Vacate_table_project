import SearchHeader from "../SearchHeader";
import RestaurantsCategory from "../RestaurantsCategory";
import "./HomePage.scss";

function HomePage() {

  return (
    <>
      <header>
        <SearchHeader />
      </header>
      <section id="main-sections-wrapper">
        <div id="main-sections">
          <section id="current-location" >
            <div id="current-location-contetnt">
              <div id="current-location-text">It looks like you're in San Francisco. Not correct?</div>
              <button id="current location-button">Get current location</button>
            </div>
            <div><RestaurantsCategory title={"Order takeout"}/></div>
            <div><RestaurantsCategory title={"Award Winning"}/></div>
          </section> 
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  )

}

export default HomePage;
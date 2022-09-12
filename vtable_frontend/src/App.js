import React from "react";
import { Route, Switch } from 'react-router-dom';
// import SigninFormPage from "./component/SigninFormPage";
import RestaurantsIndex from "./component/RestaurantsIndex";
// import SignupFormPage from "./component/SignupFormPage";
import Navigation from "./component/Navigation";
import Footer from "./component/Footer";
import RestaurantShow from "./component/RestaurantShow";
import PageNotFound from "./component/PageNotFund";
import RestaurantReservation from "./component/RestaurantReservation";

function App() {

  return (
    <>
      <div id="site-wrapper">
        <div id="base-app">
          <header id="nav-bar-wrapper">
            <div><Navigation /></div>
          </header>

          <main id="main-content-wrapper">
            <Switch>
              <Route exact path="/" component={RestaurantsIndex} />
              <Route exact path="/restaurants/:restaurantId" component={RestaurantShow} />
              <Route exact path="/restaurants/:restaurantId/reservation" component={RestaurantReservation} />
              <Route path="*" component={PageNotFound} />
            </Switch>
            {/* <div><RestaurantShow /></div> */}
          </main>

          <div id="footer-wrapper">
            <div id="footer">
              <Footer />
            </div>
          </div>

        </div>
      </div>
    </>

  );
}

export default App;

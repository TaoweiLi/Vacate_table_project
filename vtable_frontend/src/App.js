import React from "react";
import { Route, Switch } from 'react-router-dom';
// import SigninFormPage from "./component/SigninFormPage";
import RestaurantsIndex from "./component/RestaurantsIndex";
// import SignupFormPage from "./component/SignupFormPage";
import Navigation from "./component/Navigation";
import Footer from "./component/Footer";
import RestaurantShow from "./component/RestaurantShow";
import PageNotFound from "./component/PageNotFound";
import RestaurantReservation from "./component/RestaurantReservation";
import User from "./component/UserPage";
import AccountDetails from "./component/UserPage/AccountDetails";
import SearchIndexPage from "./component/SearchIndex";
import SearchHeader from "./component/SearchHeader";


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
              <Route exact path="/users/profile" component={User} />
              <Route exact path="/users/profile/account" component={AccountDetails} />
              {/* <Route exact path="/users/profile/reservation" component={UserReservationDetails} /> */}
              <Route exact path="/search/:query">
                <SearchHeader />
                <SearchIndexPage />
              </Route>
              <Route exact path="/error" component={PageNotFound} />
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

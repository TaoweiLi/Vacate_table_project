import React from "react";
import { Route, Switch } from 'react-router-dom';
// import SigninFormPage from "./component/SigninFormPage";
import HomePage from "./component/HomePage";
// import SignupFormPage from "./component/SignupFormPage";
import Navigation from "./component/Navigation";
import Footer from "./component/Footer";

function App() {

  return (
    <>
      <div id="site-wrapper">
        <div id="base-app">
          <header id="nav-bar-wrapper">
            <div>PlaceHolder-Top-Nav-Bar</div>
            <div><Navigation /></div>
          </header>

          <main id="main-content-wrapper">
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
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

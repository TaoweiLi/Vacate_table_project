import React from "react";
import { Route, Switch } from 'react-router-dom';
import SigninFormPage from "./component/SigninFormPage";
import HomePage from "./component/HomePage";
import SignupFormPage from "./component/SignupFormPage";
import Navigation from "./component/Navigation";

function App() {

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SigninFormPage} />
        <Route exact path="/signup" component={SignupFormPage} />
      </Switch>
    </>

  );
}

export default App;

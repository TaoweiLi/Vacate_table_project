import React from "react";
import { Route, Switch } from 'react-router-dom';
import SigninFormPage from "./component/SigninFormPage";
import HomePage from "./component/HomePage";



function App() {

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SigninFormPage} />
    </Switch>
  );
}

export default App;

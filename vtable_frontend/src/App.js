import React from "react";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./component/LoginFormPage";



function App() {
  // console.log("DEBUG #0");
  return (
    <Switch>
      {/* <Route path="/" component={HomePage} /> */}
      <Route path="/login" component={LoginFormPage} />
      
    </Switch>
  );
}

export default App;

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import "./HomePage.css";

function HomePage() {


  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  const handleSubmit1 = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signout())
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  if (sessionUser) {
    return (
      <>
        <h1>Home Page</h1>
        <form onSubmit={handleSubmit1}>
          <button type="submit">Sign Out</button>
        </form>
      </>
    )
  } else {
    return (
      <>
        <h1>Home Page</h1>
        <Link to="/signin">Sign In</Link> <br></br>
        <Link to="/signup">Sign Up</Link>
      </>
    );
  }
}

export default HomePage;
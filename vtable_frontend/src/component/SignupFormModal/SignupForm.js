import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.scss";


function SignupForm({setShowSignin, setShowSignup}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, phoneNumber, password }))
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
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShowSignin(true);
    setShowSignup(false);
  }

  return (





    <div id="signup-modal">
      <div id="signup-modal-wrapper">
        <div id="signup-modal-inner">
          <h2 id="signup-modal-title">Enter your email and password</h2>
          <p id="signup-modal-text">Enter the email and password associated with your OpenTable account, social login or new email.</p>
          <form id="signup-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input id="signup-fname" placeholder="First Name" type="text" size="50" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input id="signup-lname" placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input id="signup-email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input id="signup-phone" placeholder="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            <input id="signup-password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input id="signup-password-comf" placeholder="Comfirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button id="signup-modal-button" type="submit">Sign Up</button>
            {/* <button id="demo-user" onClick={() => dispatch(sessionActions.signup({ firstName: "Dai", lastName: "Li", email: "dali@vtable.com", phoneNumber: "1234567890", password: "123456" }))}>DemoUser</button> */}
            <div id="sign-in">
              Already have an account? <span id="sign-in-inner" onClick={handleClick}>Sign in</span>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default SignupForm;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.scss";


function SignupForm() {
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
            <input id="signup-fname" placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input id="signup-lname" placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input id="signup-email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input id="signup-phone" placeholder="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            <input id="signup-password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button id="signup-modal-button" type="submit">Sign Up</button>
            <button id="demo-user" onClick={() => dispatch(sessionActions.signup({ email: "dali@vtable.com", password: "123456" }))}>DemoUser</button>
          </form>
        </div>
      </div>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <ul>
    //     {errors.map(error => <li key={error}>{error}</li>)}
    //   </ul>
    //   <label>
    //     Firstname
    //     <input
    //       type="text"
    //       value={firstName}
    //       onChange={(e) => setFirstName(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Lastname
    //     <input
    //       type="text"
    //       value={lastName}
    //       onChange={(e) => setLastName(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Email
    //     <input
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Phone Number
    //     <input
    //       type="text"
    //       value={phoneNumber}
    //       onChange={(e) => setPhoneNumber(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Password
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Confirm Password
    //     <input
    //       type="password"
    //       value={confirmPassword}
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Sign Up</button>
    // </form>
  );
}

export default SignupForm;
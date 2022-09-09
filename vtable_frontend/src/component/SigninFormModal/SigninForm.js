import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './SigninForm.scss';

function SigninForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signin({ email, password }))
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

  return (
    <div id="signin-modal">
      <div id="signin-modal-wrapper">
        <div id="signin-modal-inner">
          <h2 id="signin-modal-title">Enter your email and password</h2>
          <p id="signin-modal-text">Enter the email and password associated with your OpenTable account, social login or new email.</p>
          <form id="signin-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input id="signin-email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input id="signin-password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button id="signin-modal-button" type="submit">Sign In</button>
            <button id="demo-user" onClick={() => dispatch(sessionActions.signin({ email: "dali@vtable.com", password: "123456" }))}>DemoUser</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
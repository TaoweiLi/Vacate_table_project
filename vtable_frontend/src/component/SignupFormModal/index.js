import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ showSignup, setShowSignin, setShowSignup }) {
  // const [showModal, setShowModal] = useState(false);

  const signUpOnClick = function () {
    setShowSignup(true);
  }

  const signUpModalOnClose = function () {
    setShowSignup(false)
  }

  return (
    <>
      <button className="nav-signup" onClick={() => signUpOnClick()}>Sign Up</button>
      {showSignup && (
        <Modal onClose={() => signUpModalOnClose()}>
          <SignupForm setShowSignin={setShowSignin} setShowSignup={setShowSignup} />
        </Modal>
      )}
    </>
  );
}


export default SignupFormModal;
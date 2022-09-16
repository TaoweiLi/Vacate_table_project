import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SigninForm from './SigninForm';

function SigninFormModal({ showSignin, setShowSignin, setShowSignup }) {
  // const [showModal, setShowModal] = useState(false);


  const signInOnClick = function(){
    console.log("debug   signInOnClick")
    setShowSignin(true);
  }

  const signInModalOnClose = function () {
    console.log("debug   signInModalOnClose")
    setShowSignin(false)
  }

  return (
    <>
      <button className="nav-signin" onClick={() => signInOnClick()}>Sign In</button>
      {showSignin && (
        <Modal onClose={() => signInModalOnClose()}>
          <SigninForm setShowSignin={setShowSignin} setShowSignup={setShowSignup} />
        </Modal>
      )}
    </>
  );
}


export default SigninFormModal;
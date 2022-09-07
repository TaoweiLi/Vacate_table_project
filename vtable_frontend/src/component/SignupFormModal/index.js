import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const signUpOnClick = function () {
    console.log("DEBUG HERE");
    setShowModal(true);
  }

  const signUpModalOnClose = function () {
    console.log("DEBUG HERE 2");
    setShowModal(false)
  }

  return (
    <>
      <button className="nav-signup" onClick={() => signUpOnClick()}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => signUpModalOnClose()}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}


export default SignupFormModal;
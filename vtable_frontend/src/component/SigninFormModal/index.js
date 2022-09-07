import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SigninForm from './SigninForm';

function SigninFormModal() {
  const [showModal, setShowModal] = useState(false);

  const signInOnClick = function(){
    console.log("DEBUG HERE"); 
    setShowModal(true);
  }

  const signInModalOnClose = function () {
    console.log("DEBUG HERE 2");
    setShowModal(false)
  }

  return (
    <>
      <button className="nav-signin" onClick={() => signInOnClick()}>Sign In</button>
      {showModal && (
        <Modal onClose={() => signInModalOnClose()}>
          <SigninForm />
        </Modal>
      )}
    </>
  );
}


export default SigninFormModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SigninForm from './SigninForm';

function SigninFormModal() {
  const [showModal, setShowModal] = useState(false);

  const signInOnClick = function(){
    setShowModal(true);
  }

  const signInModalOnClose = function () {
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
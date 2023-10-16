import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slice/modalSlice';
// import modalComponents from './index';
import MakeChannel from './MakeChannel';

const ModalWindow = () => { // typeModal
  const modalStatus = useSelector((state) => state.modal.modalStatus);
  // console.log('modalStatus!!!');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  // const ModalComponent = modalComponents[typeModal] || null;

  return (
    <Modal show={modalStatus} onHide={handleClose}>
      {/* {ModalComponent} */}
      <MakeChannel />
    </Modal>
  );
};
export default ModalWindow;

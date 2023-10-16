import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slice/modalSlice';
// import modalComponents from './index';
import MakeChannel from './MakeChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const ModalWindow = () => {
  const modal = useSelector((state) => state.modal);
  const { modalStatus, typeModal } = modal;
  const dispatch = useDispatch();

  const modalComponents = {
    add: <MakeChannel />,
    remove: <RemoveChannel />,
    rename: <RenameChannel />,
  };

  console.log('type!!!!!', typeModal);
  const handleClose = () => {
    dispatch(closeModal());
  };

  const ModalComponent = modalComponents[typeModal] || null;

  return (
    <Modal show={modalStatus} onHide={handleClose}>
      {ModalComponent}
      {/* <MakeChannel /> */}
    </Modal>
  );
};
export default ModalWindow;

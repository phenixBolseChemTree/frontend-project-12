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
  const { modalStatus, typeModal, modalId } = modal;
  const dispatch = useDispatch();

  console.log('type!!!!!', typeModal);
  const handleClose = () => {
    dispatch(closeModal());
  };

  // нужно определять id на этом этапе id не по выбранному каналу а по button

  const modalComponents = {
    add: <MakeChannel handleClose={handleClose} />,
    remove: <RemoveChannel handleClose={handleClose} id={modalId} />,
    rename: <RenameChannel handleClose={handleClose} id={modalId} />,
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

import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slice/index';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const ModalWindow = () => {
  const modal = useSelector((state) => state.modal);
  const { modalStatus, typeModal, modalId } = modal;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const modalComponents = {
    add: <AddChannel handleClose={handleClose} />,
    remove: <RemoveChannel handleClose={handleClose} id={modalId} />,
    rename: <RenameChannel handleClose={handleClose} id={modalId} />,
  };

  const ModalComponent = modalComponents[typeModal] || null;

  return (
    <Modal centered show={modalStatus} onHide={handleClose}>
      {ModalComponent}
    </Modal>
  );
};
export default ModalWindow;

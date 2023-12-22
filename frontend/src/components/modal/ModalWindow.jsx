import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slice/index';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const ModalWindow = () => {
  const modal = useSelector((state) => state.modal);
  const { isOpened, typeModal, extra } = modal;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const modalComponents = {
    addChannel: <AddChannel handleClose={handleClose} />,
    removeChannel: <RemoveChannel handleClose={handleClose} id={extra} />,
    renameChannel: <RenameChannel handleClose={handleClose} id={extra} />,
  };

  const ModalComponent = modalComponents[typeModal] || null;

  return (
    <Modal centered show={isOpened} onHide={handleClose}>
      {ModalComponent}
    </Modal>
  );
};
export default ModalWindow;

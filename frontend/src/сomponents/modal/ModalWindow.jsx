import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slice/modalSlice';
import { RemoveChannel, RenameChannel, MakeChannel } from './index';

// модалка будет появляться с определенным контентом внутри.
// контент определяется от переданных данных
const ModalWindow = (typeModal) => {
  const modalStatus = useSelector((state) => state.modal.modalStatus);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };
  // const handleShow = () => {
  //   dispatch(openModal({ type: 'test' }));
  // };
  return (
    <Modal show={modalStatus} onHide={handleClose}>
      {typeModal === 'remove' && <RemoveChannel handleClose={handleClose} />}
      {typeModal === 'rename' && <RenameChannel handleClose={handleClose} />}
      {typeModal === 'add' && <MakeChannel handleClose={handleClose} />}
    </Modal>
  );
};
export default ModalWindow;

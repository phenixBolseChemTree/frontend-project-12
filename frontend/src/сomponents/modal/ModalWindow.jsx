import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slice/index';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const ModalWindow = () => {
  const { t } = useTranslation();
  const modal = useSelector((state) => state.modal);
  const { modalStatus, typeModal, modalId } = modal;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const modalComponents = {
    addChannel: <AddChannel handleClose={handleClose} />,
    removeChannel: <RemoveChannel handleClose={handleClose} id={modalId} />,
    renameChannel: <RenameChannel handleClose={handleClose} id={modalId} />,
  };

  const ModalComponent = modalComponents[typeModal] || null;

  return (
    <Modal centered show={modalStatus} onHide={handleClose}>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t(`modal.${typeModal}`)}</Modal.Title>
        </Modal.Header>
        {ModalComponent}
      </div>
    </Modal>
  );
};
export default ModalWindow;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../SocketProvider';

const RemoveChannel = ({ handleClose, id }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const handleSubmit = () => {
    socket.emit('removeChannel', { id });
    handleClose();
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.shure')}</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modal.btnCancel')}
          </Button>
          <Button variant="primary" className="btn-danger" onClick={handleSubmit}>
            {t('modal.btnDelete')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </div>
  );
};
export default RemoveChannel;

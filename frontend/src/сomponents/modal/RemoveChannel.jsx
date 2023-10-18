import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../SocketProvider';

const RemoveChannel = ({ handleClose, id }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const handleSubmit = () => {
    socket.emit('removeChannel', { id });
    handleClose();
    toast(t('toast.removeChannel'), { type: 'success' });
  };

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="btn-danger" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal.Dialog>
  );
};
export default RemoveChannel;

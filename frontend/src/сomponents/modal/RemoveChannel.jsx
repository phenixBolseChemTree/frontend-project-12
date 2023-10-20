import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../SocketProvider';
import { loadingOn, loadingOff } from '../../slice';

const RemoveChannel = ({ handleClose, id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.modal.isLoading);
  const { t } = useTranslation();
  const socket = useSocket();

  const handleSubmit = () => {
    if (!isLoading) {
      dispatch(loadingOn());
      socket.emit('removeChannel', { id });
      setTimeout(() => {
        dispatch(loadingOff());
      }, 3000);
    }
  };

  return (
    <Modal.Body>
      <p className="lead">{t('modal.shure')}</p>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.btnCancel')}
        </Button>
        <Button
          variant="primary"
          className="btn-danger"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {t('modal.btnDelete')}
        </Button>
      </Modal.Footer>
    </Modal.Body>
  );
};
export default RemoveChannel;

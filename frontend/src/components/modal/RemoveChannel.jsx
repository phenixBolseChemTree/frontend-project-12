import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useApi } from '../ApiProvider';
import { loadingOn, loadingOff, closeModal } from '../../slice';

import apiActions from '../apiActions';

const RemoveChannel = ({ handleClose, id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.modal.isLoading);
  const { t } = useTranslation();
  const socket = useApi();

  const handleSubmit = () => {
    if (!isLoading) {
      dispatch(loadingOn());
      try {
        apiActions.removeChannel({ id, socket });
        toast(t('toast.removeChannel'), { type: 'success' });
        dispatch(loadingOff());
        dispatch(closeModal());
      } catch (e) {
        console.log('Networ Error');
      }
      setTimeout(() => {
        dispatch(loadingOff());
      }, 3000);
    }
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
    </div>
  );
};
export default RemoveChannel;

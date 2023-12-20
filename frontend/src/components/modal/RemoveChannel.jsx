import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { closeModal } from '../../slice';
import { useApi } from '../../context/ApiContext';

const RemoveChannel = ({ handleClose, id }) => {
  const api = useApi();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        await api.removeChannel({ id });
        toast(t('toast.removeChannel'), { type: 'success' });
        dispatch(closeModal());
      } finally {
        setIsLoading(false);
      }
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

import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useApi } from '../../context/ApiContext';
import { loadingOn, loadingOff, closeModal } from '../../slice';

const RenameChannel = ({ handleClose, id }) => {
  const api = useApi();
  const { t } = useTranslation();
  const controlRef = useRef(null);
  const channels = useSelector((state) => state.chat.channels);
  const isLoading = useSelector((state) => state.modal.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (controlRef.current) {
      controlRef.current.focus();
    }
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('error.minWord3AndmaxWord20'))
      .max(20, t('error.minWord3AndmaxWord20'))
      .test('is-unique', t('modal.mustBeUnique'), (value) => !channels.map((channel) => channel.name).includes(value))
      .required(''),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isLoading) {
        const { name } = values;
        dispatch(loadingOn());
        try {
          await api.renameChannel({ id, name });
          toast(t('toast.renameChannel'), { type: 'success' });
          dispatch(loadingOff());
          dispatch(closeModal());
        } catch (e) {
          dispatch(loadingOff());
        }
      }
    },
  });
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              autoFocus
              ref={controlRef}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modal.formLabelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('modal.btnCancel')}
              </Button>
              <Button variant="primary" onClick={formik.handleSubmit} disabled={isLoading}>
                {t('modal.btnSend')}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </div>
  );
};
export default RenameChannel;

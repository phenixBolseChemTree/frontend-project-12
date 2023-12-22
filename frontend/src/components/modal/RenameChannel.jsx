import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../context/ApiContext';

const RenameChannel = ({ handleClose, id }) => {
  const api = useApi();
  const { t } = useTranslation();
  const controlRef = useRef(null);
  const channels = useSelector((state) => state.chat.channels);

  useEffect(() => {
    if (controlRef.current) {
      controlRef.current.focus();
    }
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'minWord3AndmaxWord20')
      .max(20, 'minWord3AndmaxWord20')
      .test('is-unique', t('modal.mustBeUnique'), (value) => !channels.map((channel) => channel.name).includes(value))
      .required(''),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { name } = values;
        setSubmitting(true);
        await api.renameChannel({ id, name });
        toast(t('toast.renameChannel'), { type: 'success' });
        handleClose();
      } catch (e) {
        toast(t('error.networkError'), { type: 'error' });
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
              {t(`error.${formik.errors.name}`)}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('modal.btnCancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
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

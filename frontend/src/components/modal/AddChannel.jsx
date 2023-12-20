import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { closeModal } from '../../slice';
import { useApi } from '../../context/ApiContext';

const AddChannel = ({ handleClose }) => {
  const api = useApi();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.chat.channels);

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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.newChannel(values);
        toast(t('toast.addChannel'), { type: 'success' });
        dispatch(closeModal());
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleModalClose = () => {
    handleClose();
    dispatch(closeModal());
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
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
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modal.formLabelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
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

export default AddChannel;

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from '../ApiProvider';
import { loadingOn, loadingOff } from '../../slice';
import apiActions from '../apiActions';

const AddChannel = ({ handleClose }) => {
  const socket = useApi();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);
  const isLoading = useSelector((state) => state.modal.isLoading);
  const { t } = useTranslation();

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
    onSubmit: (values) => {
      if (!isLoading) {
        const { name } = values;
        dispatch(loadingOn());

        apiActions.newChannel({ name, socket });
        setTimeout(() => {
          dispatch(loadingOff());
        }, 3000);
      }
    },
  });

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
export default AddChannel;

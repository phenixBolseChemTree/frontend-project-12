import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSocket } from '../SocketContext';

const AddChannel = ({ handleClose }) => {
  const socket = useSocket();
  const channels = useSelector((state) => state.chat.channels);
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
      const { name } = values;
      socket.emit('newChannel', { name });
      handleClose();
    },
  });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>MakeChannel</Modal.Title>
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
            />
            <Form.Label>random text</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={formik.handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal.Dialog>

  );
};
export default AddChannel;

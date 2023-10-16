import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSocket } from '../SocketContext';

const MakeChannel = ({ handleClose }) => {
  const socket = useSocket();
  // console.log(123);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const { name } = values;
      console.log('name!!!!', name);
      socket.emit('newChannel', { name });
    },
  });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>MakeChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="new Channel"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={!!formik.errors.name}
          />
          <Form.Label>random text</Form.Label>
          <Form.Control.Feedback>
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
    </Modal.Dialog>

  );
};
export default MakeChannel;

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSocket } from '../SocketContext';

const RenameChannel = ({ handleClose, id }) => {
  console.log('handleClose!!!', handleClose);
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const { name } = values;
      socket.emit('renameChannel', { id, name });
    },
  });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>RenameChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            required
            type="text"
            placeholder="новое имя канала"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={!!formik.errors.name}
          />
          <Form.Label htmlFor="name">LOCATOR</Form.Label>
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
export default RenameChannel;

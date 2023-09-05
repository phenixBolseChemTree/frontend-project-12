import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CustomModal = ({ socket }) => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setChannelName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newChannel', { name: channelName });
    console.log('Форма отправлена!!!', channelName);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Новый канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Введите имя нового канала..."
                onChange={handleInputChange}
                value={channelName}
                autoFocus
              />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Создать канал
                </Button>
              </Modal.Footer>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default CustomModal;
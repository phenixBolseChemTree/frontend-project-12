import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


// const getId = (() => {
//   let idChanell = 3;
//   return () => {
//     idChanell += 1;
//     return idChanell;
//   };
// })();


const CustomModal = () => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    // Обработчик для обновления состояния при вводе данных
    setChannelName(e.target.value);
    console.log('Введено', e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('Форма отправлена!!!', e);
  }
  return (
    <>
      <Button className='' variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Новый канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Введите имя нового канала..."
                onChange={handleInputChange}
                value={channelName}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CustomModal;
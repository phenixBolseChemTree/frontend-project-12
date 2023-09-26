import { Dropdown } from "bootstrap";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ socket, id}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    socket.emit('removeChannel', { id });
    handleClose();
  };

  return (
    <>
      <button variant="primary" onClick={handleShow}>
        Удалить
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Уверены?</h2>

          <button onClick={handleDelete} type="submit" className="btn btn-primary">Удалить</button>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalDelete;

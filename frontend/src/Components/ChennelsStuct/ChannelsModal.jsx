import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(2, 'Минимум 3 буквы')
    .max(50, 'Максимум 16 букв')
    .required('Обязательное поле'),
});


const ChannelsModal = ({ action, name, id, socket }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEvent = () => {
    socket.emit('removeChannel', { id });
    handleClose();
  };

  return (
    <>
      <text variant="primary" onClick={handleShow}>
        {action === 'delete' ? 'Удалить канал:' : 'Переименовать канал:'}
      </text>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action === 'delete' ? 'Удалить канал:' : 'Переименовать канал:'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='lead'>{action === 'delete' ? 'Уверены?' : 'Форма'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleEvent}>
            {action === 'delete' ? 'Удалить' : 'Отправить'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ChannelsModal
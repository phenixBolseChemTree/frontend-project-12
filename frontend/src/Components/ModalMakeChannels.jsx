import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(2, 'Минимум 3 буквы')
    .max(50, 'Максимум 16 букв')
    .required('Обязательное поле'),
});

const CustomModal = ({ socket, chanells }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <button variant="primary" className='btn btn-primary' onClick={handleShow}>
        +
      </button> */}

      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
            {/* <CustomModal socket={socket} chanells={channels} /> */}
            <span className="visually-hidden">+</span>
          </button>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Новый канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ channelName: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              socket.emit('newChannel', { name: values.channelName });
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Field
                    type="text"
                    id="channelName"
                    name="channelName"
                    className="form-control"
                    autoFocus
                    placeholder="Введите имя канала..."
                    onChange={handleChange} value={values.channelName} />
                  <ErrorMessage name="channelName" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary">Создать</button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default CustomModal;
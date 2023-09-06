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
      <button variant="primary" onClick={handleShow}>
        +
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
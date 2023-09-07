import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(2, 'Минимум 3 буквы')
    .max(50, 'Максимум 16 букв')
    .required('Обязательное поле'),
});


const ModalRename = ({ socket, id, name }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRename = (id, value) => {
    console.log('value!!!', value);
    socket.emit('renameChannel', { id, name: value });
  };

  return (
    <>
      <button variant="primary" onClick={handleShow}>
        Переименовать
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Уверены?</h2>

          <Formik
            initialValues={{ channelName: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
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
                <button onClick={() => handleRename(id, values.channelName)} className="btn btn-primary">Создать</button>

              </Form>
            )}
          </Formik>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalRename;

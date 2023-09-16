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


const ChannelsModal = ({ action, name, id, socket, channels }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    socket.emit('removeChannel', { id });
    handleClose();
  };
  const handleRename = (id, value) => {
    socket.emit('renameChannel', { id, name: value });
  };

  return (
    <>
      <label variant="primary" onClick={handleShow}>
        {action === 'delete' ? 'Удалить канал' : 'Переименовать канал'}
      </label>

      {action === 'delete' &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Удалить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body className='lead'>Уверены?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button autoFocus variant="primary" onClick={handleDelete}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {action === 'rename' &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Переименовать канал {name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
      }
    </>
  );
}


export default ChannelsModal
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const SignupSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(2, 'Минимум 3 буквы')
    .max(50, 'Максимум 16 букв')
    .required('Обязательное поле'),
});


const ChannelsModal = ({ action, name, id, socket, channels }) => {
  const { t } = useTranslation('');
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
        {action === 'delete' ? t('modal.removeChannel') : t('modal.renameChannel')}
      </label>

      {action === 'delete' &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='lead'>{t('modal.shure')}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('modal.btnCancel')}
            </Button>
            <Button autoFocus variant="primary" onClick={handleDelete}>
              {t('modal.btnDelete')}
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {action === 'rename' &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.renameChannel')} {name}</Modal.Title>
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
                      onChange={handleChange} value={values.channelName} />
                    <ErrorMessage name="channelName" component="div" className="text-danger" />
                  </div>
                  <button onClick={() => handleRename(id, values.channelName)} className="btn btn-primary">{t('modal.btnCreate')}</button>

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
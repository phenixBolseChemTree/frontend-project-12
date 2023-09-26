import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ChannelsModal = ({ action, id, socket }) => {
  const { t } = useTranslation('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notify = (textAction) => {
    const texti18 = `toast.${textAction}`;
    toast(t(texti18), {
      type: 'success', position: 'top-right'
    });
  }

  const SignupSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, t('error.minWord3AndmaxWord20'))
      .max(20, t('error.minWord3AndmaxWord20'))
      .required(''),
  });

  const handleDelete = () => {
    socket.emit('removeChannel', { id });
    notify('removeChannel')
    handleClose();
  };
  const handleRename = (id, value) => {
    socket.emit('renameChannel', { id, name: value });
    notify('renameChannel')
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
            <Button
              autoFocus
              variant="primary"
              onClick={handleDelete}
            >
              {t('modal.btnDelete')}
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {action === 'rename' &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Предотвращаем стандартное поведение Enter (избегаем сабмита формы)
                          handleSubmit(); // Вызываем метод handleSubmit из Formik для отправки формы
                        }
                      }}
                      onChange={handleChange} value={values.channelName} />
                    <ErrorMessage name="channelName" component="div" className="text-danger" />
                  </div>
                  <Modal.Footer>
                    <button onClick={() => handleRename(id, values.channelName)} className="btn btn-primary">{t('modal.btnCreate')}</button>
                    <Button variant="secondary" onClick={handleClose}>
                      {t('modal.btnCancel')}
                    </Button>
                  </Modal.Footer>
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
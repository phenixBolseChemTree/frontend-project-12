import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import * as Yup from 'yup';


function MyModal({action, socket, id, showModal, closeModal }) {
  const { t } = useTranslation()

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
    closeModal();
  };
  const handleRename = (id, value) => {
    socket.emit('renameChannel', { id, name: value });
    notify('renameChannel')
  };

  return (
    <>
      {showModal === 'delete' &&
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='lead'>{t('modal.shure')}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              {t('modal.btnCancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleDelete}
            >
              {t('modal.btnDelete')}
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {showModal === 'rename' &&
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ channelName: '' }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                closeModal();
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
                  <Modal.Footer>
                    <button onClick={() => handleRename(id, values.channelName)} className="btn btn-primary">{t('modal.btnCreate')}</button>
                    <Button variant="secondary" onClick={closeModal}>
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

export default MyModal;
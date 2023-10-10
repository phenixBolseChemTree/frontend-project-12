import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const MyModal = ({
  socket, id, showModal, closeModal,
}) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.app.channels);
  const channelNames = channels.map((channel) => channel.name);

  const notify = (textAction) => {
    const texti18 = `toast.${textAction}`;
    toast(t(texti18), {
      type: 'success', position: 'top-right',
    });
  };

  const SignupSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, t('error.minWord3AndmaxWord20'))
      .max(20, t('error.minWord3AndmaxWord20'))
      .test('is-unique', t('modal.mustBeUnique'), (value) => !channelNames.includes(value))
      .required(''),
  });

  const handleDelete = () => {
    socket.emit('removeChannel', { id });
    notify('removeChannel');
    closeModal();
  };

  const handleRename = (value) => {
    socket.emit('renameChannel', { id, name: value });
    notify('renameChannel');
  };

  return (
    <>
      {showModal === 'delete'
        && (
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="lead">{t('modal.shure')}</Modal.Body>
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
        )}
      {showModal === 'rename'
        && (
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{ channelName: '' }}
                validationSchema={SignupSchema}
                onSubmit={() => {
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
                        onChange={handleChange}
                        value={values.channelName}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleRename(values.channelName);
                            closeModal();
                          }
                        }}
                      />
                      <ErrorMessage name="channelName" component="div" className="text-danger" />
                    </div>
                    <Modal.Footer>
                      <button
                        type="button"
                        onClick={() => handleRename(values.channelName)}
                        className="btn btn-primary"
                      >
                        {t('modal.btnCreate')}

                      </button>
                      <Button variant="secondary" onClick={closeModal}>
                        {t('modal.btnCancel')}
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        )}
    </>
  );
};

export default MyModal;

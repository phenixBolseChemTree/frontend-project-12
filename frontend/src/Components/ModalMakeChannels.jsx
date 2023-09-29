import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomModal = ({ socket }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
        <span className="visually-hidden">+</span>
      </button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.addChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ channelName: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              socket.emit('newChannel', { name: values.channelName })
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
                    placeholder={t('modal.formPlaceholder')}
                    onChange={handleChange} value={values.channelName} />
                  <ErrorMessage name="channelName" component="div" className="text-danger" />
                </div>
                <Modal.Footer>
                  <button type="submit" onClick={() => notify('addChannel')} className="btn btn-primary">{t('modal.btnCreate')}</button>
                  <Button variant="secondary" onClick={handleClose}>
                    {t('modal.btnCancel')}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default CustomModal;
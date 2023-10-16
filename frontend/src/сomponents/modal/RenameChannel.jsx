import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const RenameChannel = ({ handleClose }) => {
  const channelNames = useSelector((state) => state.chat.channels); // тут не имена а обьекты
  console.log('channelNames', channelNames);
  const { t } = useTranslation();

  const SignupSchema = yup.object().shape({
    firstInput: yup.string()
      .min(3, t('error.minWord3AndmaxWord20'))
      .max(20, t('error.minWord3AndmaxWord20'))
      .test('is-unique', t('modal.mustBeUnique'), (value) => !channelNames.includes(value))
      .required(''),
  });

  const formik = useFormik({
    initialValues: {
      nameChannal: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {

    },
  });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>RenameChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
export default RenameChannel;

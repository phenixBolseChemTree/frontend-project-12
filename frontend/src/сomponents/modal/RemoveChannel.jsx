import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSocket } from '../SocketContext';

// import { useFormik } from 'formik';
// import yup from 'yup';

const RemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  // const channels = useSelector((state) => state.chat.channels);
  // const channelNames = channels.map((channel) => channel.name);

  // const validationSchema = yup.object().shape({
  //   firstInput: yup.string()
  //     .min(3, t('error.minWord3AndmaxWord20'))
  //     .max(20, t('error.minWord3AndmaxWord20'))
  //     .test('is-unique', t('modal.mustBeUnique'), (value) => !channelNames.includes(value))
  //     .required(''),
  // });

  // const formik = useFormik({
  //   initialValues: {

  //   },
  // });

  const handleRemove = () => {
    console.log('handleRemove!!!');
    console.log('currentChannelId', currentChannelId);
    socket.emit('removeChannel', { currentChannelId });
    // notify('removeChannel');
    // closeModal();
  };

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleRemove}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
export default RemoveChannel;

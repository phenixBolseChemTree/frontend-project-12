import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  loadingOff,
  setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel, closeModal,
} from '../slice/index';

const SocketConnect = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const notify = (type) => {
      toast(t(`toast.${type}`), { type: 'success' });
      dispatch(loadingOff());
      dispatch(closeModal());
    };

    const getData = (action) => {
      const eventHandler = (payload) => {
        switch (action) {
          case 'newMessage':
            dispatch(setNewMessage(payload));
            break;
          case 'newChannel':
            dispatch(setNewChannel(payload));
            notify('addChannel');
            break;
          case 'removeChannel':
            dispatch(setRemoveChannel(payload));
            notify('removeChannel');
            break;
          case 'renameChannel':
            dispatch(setRenameChannel(payload));
            notify('renameChannel');
            break;
          default:
        }
      };

      socket.on(action, eventHandler);
      return () => {
        socket.off(action, eventHandler);
      };
    };

    getData('newMessage');
    getData('newChannel');
    getData('removeChannel');
    getData('renameChannel');
  }, [dispatch, socket, t]);

  return null;
};

export default SocketConnect;

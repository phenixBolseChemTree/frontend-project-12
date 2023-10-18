import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel,
} from '../slice/index';
import { useSocket } from './SocketProvider';

const SocketConnect = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    const getData = (action) => {
      const eventHandler = (payload) => {
        switch (action) {
          case 'newMessage':
            dispatch(setNewMessage(payload));
            break;
          case 'newChannel':
            dispatch(setNewChannel(payload));
            break;
          case 'removeChannel':
            dispatch(setRemoveChannel(payload));
            break;
          case 'renameChannel':
            dispatch(setRenameChannel(payload));
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
  }, [dispatch, socket]);

  return null;
};

export default SocketConnect;

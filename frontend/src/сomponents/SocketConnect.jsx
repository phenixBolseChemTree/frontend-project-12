// import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel,
} from '../Redux/chatSlice';
import { useSocket } from './SocketContext';

// const socket = io.connect('http://localhost:3000/');
const SocketConnect = () => {
  console.log('!!!SocketConnect');
  const dispatch = useDispatch();
  const socket = useSocket();
  console.log('сокет выиден!!!', socket);

  useEffect(() => {
    const getData = (action) => {
      const eventHandler = (payload) => {
        switch (action) {
          case 'newMessage':
            console.log('newMessage', payload);
            dispatch(setNewMessage(payload));
            break;
          case 'newChannel':
            console.log('newChannel');
            dispatch(setNewChannel(payload));
            break;
          case 'removeChannel':
            console.log('removeChannel');
            dispatch(setRemoveChannel(payload));
            break;
          case 'renameChannel':
            console.log('renameChannel');
            dispatch(setRenameChannel(payload));
            break;
          default:
        }
      };

      socket.on(action, eventHandler);

      // Добавляем отключение обработчика при размонтировании компонента что бы не рендерить
      // вложенные компоненты по несколько раз (вроде так?)
      return () => {
        socket.off(action, eventHandler);
      };
    };

    getData('newMessage');
    getData('newChannel');
    getData('removeChannel');
    getData('renameChannel');
  }, [dispatch]);

  return null;
};

export default SocketConnect;

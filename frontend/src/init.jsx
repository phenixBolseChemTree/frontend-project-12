import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import resources from './locales/index';
import App from './components/App';
// import SocketConnect from './components/SocketConnect';
// import { ApiProvider } from './components/ApiProvider';
import 'react-toastify/dist/ReactToastify.css';
import reducer, {
  closeModal,
  loadingOff,
  setNewChannel, setNewMessage, setRemoveChannel, setRenameChannel,
} from './slice';
import { AuthProvider } from './components/AuthContext';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const store = configureStore({
    reducer,
  });

  const notify = () => {
    store.dispatch(loadingOff());
    store.dispatch(closeModal());
  };

  const getData = (action) => {
    const eventHandler = (payload) => {
      switch (action) {
        case 'newMessage':
          store.dispatch(setNewMessage(payload));
          break;
        case 'newChannel':
          store.dispatch(setNewChannel(payload));
          // notify('addChannel');
          notify();
          break;
        case 'removeChannel':
          store.dispatch(setRemoveChannel(payload));
          // notify('removeChannel');
          notify();
          break;
        case 'renameChannel':
          store.dispatch(setRenameChannel(payload));
          // notify('renameChannel');
          notify();
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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          {/* <ApiProvider socket={socket}> */}
          <App socket={socket} />
          {/* </ApiProvider> */}
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;

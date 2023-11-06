import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import resources from './locales/index';
import App from './components/App';

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

  const notify = (type) => {
    toast(i18n.t(`toast.${type}`), { type: 'success' });
    store.dispatch(loadingOff());
    store.dispatch(closeModal());
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(setNewMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(setNewChannel(payload));
    notify('addChannel');
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(setRemoveChannel(payload));
    notify('removeChannel');
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(setRenameChannel(payload));
    notify('renameChannel');
  });

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

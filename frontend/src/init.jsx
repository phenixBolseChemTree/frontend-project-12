import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import resources from './locales/index';
import App from './components/App';
import { ApiContext } from './components/ApiProvider';

import 'react-toastify/dist/ReactToastify.css';
import reducer, {
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

  socket.on('newMessage', (payload) => {
    store.dispatch(setNewMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(setNewChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(setRemoveChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(setRenameChannel(payload));
  });

  const api = {
    newMessage: (data) => {
      socket.emit('newMessage', { body: data.body, username: data.username, channelId: data.channelId });
    },
    newChannel: (data) => {
      socket.emit('newChannel', { name: data.name });
    },
    removeChannel: (data) => {
      socket.emit('removeChannel', { id: data.id });
    },
    renameChannel: (data) => {
      socket.emit('renameChannel', { id: data.id, name: data.name });
    },
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ApiContext.Provider value={api}>
            <App />
          </ApiContext.Provider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;

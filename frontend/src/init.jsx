import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as ProviderError, ErrorBoundary } from '@rollbar/react';

import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import leoFilter from 'leo-profanity';
import resources from './locales/index';
import App from './components/App';
import { ApiContext } from './context/ApiContext';

import 'react-toastify/dist/ReactToastify.css';
import reducer, {
  setNewChannel, setNewMessage, setRemoveChannel, setRenameChannel,
} from './slice';
import { AuthProvider } from './context/AuthContext';

const { REACT_APP_ROLLBAR_ACCESS_TOKEN } = process.env;
const { REACT_APP_ENV } = process.env;

const rollbarConfig = {
  accessToken: REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: REACT_APP_ENV,
};

const init = async () => {
  const socket = io();
  leoFilter.add(leoFilter.getDictionary('ru'), leoFilter.getDictionary('en'), leoFilter.getDictionary('fr'));
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

  const promisAll = (event, data) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit(event, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const api = {
    newMessage: (data) => promisAll('newMessage', { body: data.body, username: data.username, channelId: data.channelId }),
    newChannel: (data) => promisAll('newChannel', { name: data.name }),
    removeChannel: (data) => promisAll('removeChannel', { id: data.id }),
    renameChannel: (data) => promisAll('renameChannel', { id: data.id, name: data.name }),
  };

  return (
    <ProviderError config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ApiContext.Provider value={api}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ApiContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </ProviderError>
  );
};

export default init;

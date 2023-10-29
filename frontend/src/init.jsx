import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import resources from './locales/index';
import App from './components/App';
import SocketConnect from './components/SocketConnect';
import { ApiProvider } from './components/ApiProvider';
import 'react-toastify/dist/ReactToastify.css';
import reducer from './slice';
import { AuthProvider } from './components/AuthContext';

const Init = async () => {
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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ApiProvider>
            <SocketConnect socket={socket} />
            <App />
          </ApiProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default Init;

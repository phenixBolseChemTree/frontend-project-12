import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client'; // Импортируйте io здесь
import resources from './locales/index';
import App from './components/App';
import { AuthProvider } from './components/AuthContext';
import { SocketProvider } from './components/SocketProvider';

import 'react-toastify/dist/ReactToastify.css';
import reducer from './slice';

const init = async () => {
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

  // Инициализируйте сокс здесь
  const socket = io();

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;

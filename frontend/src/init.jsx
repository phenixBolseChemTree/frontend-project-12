import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import resources from './localization/index';
import App from './сomponents/App';
import SocketConnect from './сomponents/SocketConnect';
import { SocketProvider } from './сomponents/SocketContext';
import 'react-toastify/dist/ReactToastify.css';
import chatSlice from './slice/chatSlice';

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
    reducer: {
      app: chatSlice,
    },
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketProvider>
          <SocketConnect />
          <App />
        </SocketProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;

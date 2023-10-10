import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './Redux/store';
import resources from './localization/index';
import App from './App';
import SocketConnect from './сomponents/SocketConnect';

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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketConnect />
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;

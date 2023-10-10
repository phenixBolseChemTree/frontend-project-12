import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store';
import './localization/i18n';
import SocketConnect from './сomponents/SocketConnect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SocketConnect />
    <App />
  </Provider>,
);

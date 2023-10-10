// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './Redux/store';
// import './localization/i18n';
// import SocketConnect from './сomponents/SocketConnect';
// import Init from './init';

// <Provider store={store}>
// <SocketConnect />
// <App />
// </Provider>

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();

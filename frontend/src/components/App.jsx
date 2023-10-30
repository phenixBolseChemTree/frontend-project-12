import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './AuthContext';
import {
  NavPage, Chat, Login, Signup, Page404,
} from './pages/pages';
import ModalWindow from './modal/ModalWindow';
import { SocketContext } from './ApiProvider';

const { REACT_APP_ROLLBAR_ACCESS_TOKEN } = process.env;
const { REACT_APP_ENV } = process.env;

const rollbarConfig = {
  accessToken: REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: REACT_APP_ENV,
};

const App = ({ socket }) => {
  console.log(123);
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <SocketContext.Provider value={socket}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<NavPage />}>
                  <Route path="/" element={<Chat />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<Page404 />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <ToastContainer />
            <ModalWindow />
          </AuthProvider>
        </SocketContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;

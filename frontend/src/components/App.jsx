import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Page404 from './Page404';
import Chat from './Chat';
import PrivateOutlet from './PrivateOutlet';

import ModalWindow from './modal/ModalWindow';
import Layout from './Layout';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateOutlet>
                <Chat />
              </PrivateOutlet>
            )}
          />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    <ToastContainer />
    <ModalWindow />
  </AuthProvider>
);

export default App;

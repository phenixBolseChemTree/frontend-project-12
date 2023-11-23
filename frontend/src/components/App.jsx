import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './AuthContext';
import {
  NavPage, Login, Signup, Page404, RenderChat,
} from './pages/pages';
import ModalWindow from './modal/ModalWindow';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavPage />}>
          <Route path="/" element={<RenderChat />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    <ModalWindow />
  </AuthProvider>
);

export default App;

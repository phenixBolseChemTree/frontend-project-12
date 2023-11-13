import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './AuthContext';
import {
  NavPage, Chat, Login, Signup, Page404,
} from './pages/pages';
import ModalWindow from './modal/ModalWindow';

const App = () => {
  console.log(123);
  return (
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
  );
};

export default App;

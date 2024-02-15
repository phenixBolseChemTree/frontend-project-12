import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import Signup from './Signup';
import Login from './Login';
import Page404 from './Page404';
import Chat from './Chat';
import PrivateOutlet from './PrivateOutlet';
import routes from '../routes';
import ModalWindow from './modal/ModalWindow';
import Layout from './Layout';
import Feedback from './Feedback';

const App = () => (
  <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path={routes.chat}
            element={(
              <PrivateOutlet>
                <Chat />
              </PrivateOutlet>
            )}
          />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.feedback} element={<Feedback />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    <ToastContainer />
    <ModalWindow />
  </>
);

export default App;

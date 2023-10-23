import React, { useRef, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import routes from '../../../routes';
import { AuthContext } from '../../AuthContext';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { name, password } = values;
      try {
        const response = await axios.post(routes.login, { username: name, password });
        const { token } = response.data;
        if (token !== undefined) {
          localStorage.setItem('username', name);
          localStorage.setItem('token', token);
          navigate('/');
          login();
        }
      } catch (error) {
        if (error.message === 'Network Error') {
          toast(t('toast.connectError'), { type: 'error' });
        }
        setLoginError(true);
        passwordRef.current.classList.add('is-invalid');
        usernameRef.current.classList.add('is-invalid');
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          required
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          ref={usernameRef}
        />
        <Form.Label htmlFor="name">{t('login.yourName')}</Form.Label>

      </Form.Group>

      <Form.Group className="form-floating mb-5">
        <Form.Control
          required
          type="text"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          ref={passwordRef}
        />
        <Form.Label htmlFor="password">{t('login.password')}</Form.Label>

        <Form.Control.Feedback type="invalid" tooltip>
          {loginError && t('error.invalidNameOrPassword')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button onClick={formik.handleSubmit} type="submit" variant="outline-primary" className="w-100 mb-3 btn btn-outline-primary">{t('login.come')}</Button>
    </Form>
  );
};

export default LoginForm;

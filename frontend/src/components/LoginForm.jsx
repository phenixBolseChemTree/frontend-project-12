import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { name, password } = values;

      try {
        const response = await axios.post(routes.apiLogin, { username: name, password });

        if (response.data) {
          login(response.data);
          navigate(routes.chat);
        }
      } catch (error) {
        if (!error.isAxiosError) {
          toast(t('error.unknownError'), { type: 'error' });
        } else if (error.response?.status === 401) {
          setLoginError(true);
          setInvalidUsername(true);
          setInvalidPassword(true);
        } else {
          toast(t('error.networkError'), { type: 'error' });
        }
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
          isInvalid={invalidUsername}
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
          isInvalid={invalidPassword}
        />
        <Form.Label htmlFor="password">{t('login.password')}</Form.Label>

        <Form.Control.Feedback type="invalid" tooltip>
          {loginError && t('error.invalidNameOrPassword')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn btn-outline-primary">
        {t('login.come')}
      </Button>
    </Form>
  );
};

export default LoginForm;

import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Container, Row, Col, Card, Button,
  Form,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import img from '../assets/red_flag.jpeg';
import { AuthContext } from '../сomponents/AuthContext';
import routes from '../routes';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

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
        localStorage.setItem('username', name);
        localStorage.setItem('token', token);
        navigate('/');
        login();
      } catch (error) {
        if (error.message === 'Network Error') {
          toast('Ошибка соединения', { type: 'error' });
        }
        setLoginError(true);
        passwordRef.current.classList.add('is-invalid');
        usernameRef.current.classList.add('is-invalid');
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <img
                  src={img}
                  className="rounded-circle"
                  alt={t('login.come')}
                />
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('login.come')}</h1>
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
                      {loginError && 'Неверные имя пользователя или пароль'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
                <Button onClick={formik.handleSubmit} type="submit" variant="outline-primary" className="w-100 mb-3 btn btn-outline-primary">Войти</Button>

              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                {' '}
                <a href="/signup">{t('login.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

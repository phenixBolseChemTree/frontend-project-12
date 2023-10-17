import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import img from '../assets/happy_man.jpg';
import { AuthContext } from '../сomponents/AuthContext';
import routes from '../routes';

const Signup = () => {
  // const errorNetwork = useRef(null);
  const [networkError, setNetworkError] = useState(false);
  const usernameRef = useRef(null);
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const SignupSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('error.minWord3AndmaxWord20'))
      .max(20, t('error.minWord3AndmaxWord20'))
      .required(t('error.requiredField')),
    password: yup.string()
      .min(6, t('error.minCharacters6'))
      .max(50, 'Максимум 50 символов')
      .required(t('error.requiredField')),
    passwordRes: yup.string()
      .min(6, t('error.minCharacters6'))
      .oneOf([yup.ref('password'), null], t('error.samePasswords'))
      .required(t('error.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      passwordRes: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { name, password } = values;
      try {
        const response = await axios.post(routes.signup, { username: name, password });
        const { token } = response.data;
        localStorage.setItem('username', name);
        localStorage.setItem('token', token);
        login();
        navigate('/');
      } catch (error) {
        if (error.response.status === 409) {
          setNetworkError(true);
          usernameRef.current.select();
        }
        // Обработка ошибки, например, вывод сообщения или запись в логи.
        console.error('Произошла ошибка при отправке запроса:', error);
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={img}
                  className="rounded-circle"
                  alt={t('signup.registration')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.registration')}</h1>
                <Form.Group className="form-floating mb-3">
                  {/* <Form.Floating> */}
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    isInvalid={!!formik.errors.name}
                  />
                  <Form.Label htmlFor="name">Имя пользователя</Form.Label>
                  {/* </Form.Floating> */}
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    required
                    type="text"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>

                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">

                  <Form.Control
                    required
                    type="text"
                    name="passwordRes"
                    id="passwordRes"
                    onChange={formik.handleChange}
                    value={formik.values.passwordRes}
                    isInvalid={!!formik.errors.passwordRes}
                    className={`${networkError ? 'is-invalid' : ''}`}
                  />
                  <Form.Label htmlFor="passwordRes">Подтвердите пароль</Form.Label>

                  <Form.Control.Feedback type="invalid" tooltip>
                    {/* {formik.errors.passwordRes} */}
                    {networkError ? 'Такой пользователь уже существует' : formik.errors.name}

                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" onClick={formik.handleSubmit}>Отправить</Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

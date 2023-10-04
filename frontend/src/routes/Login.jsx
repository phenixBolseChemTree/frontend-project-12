import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img from '../assets/red_flag.jpeg'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
// import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../сomponents/AuthContext';

// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, t('error.minWord3'))
//     .max(20, t('error.maxWord20'))
//     .required('Обязательное поле'),
//   password: Yup.string()
//     .min(3, t('error.minСharacters2'))
//     .max(50, 'Максимум 50 символов')
//     .required('Обязательное поле'),
// });

const Login = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false);
  const { login } = useContext(AuthContext);


  const initialValues = {
    name: '',
    password: '',
  };
  const navigate = useNavigate();

  const onSubmit = ({ name, password }) => {
    console.log(name);
    console.log(password);
    axios.post('/api/v1/login', { username: String(name), password: String(password) }).then((response) => {
      const { token } = response.data
      localStorage.setItem('username', name);
      localStorage.setItem('token', token);
      navigate('/');
      login();
    }
    )
      .catch((e) => {
        console.log('отлавливаем ошибку!!!', e);
        setShow(true)
      })
  };
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
                <Formik
                  initialValues={initialValues}
                  // validationSchema={SignupSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">{t('login.yourName')}</label>
                      <Field type="text" id="name" name="name" className="form-control" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">{t('login.password')}</label>
                      <Field type="text" id="password" name="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    {show &&
                      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>{t('error.errorText')}</Alert.Heading>
                        <p>
                          {t('error.AlertUserAlreadyExists')}
                        </p>
                      </Alert>
                    }

                    <button type="submit" className="btn btn-primary">{t('login.btnSend')}</button>
                  </Form>
                </Formik>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span> <a href="/signup">{t('login.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img from '../img/hexlet_human/happy_man.jpg'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../Redux/authSlice';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Минимум 2 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  passwordRes: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const Login = () => {
  const dispath = useDispatch();

  const [show, setShow] = useState(false);

  const initialValues = {
    name: '',
    password: '',
    passwordRes: '',
  };
  const navigate = useNavigate();

  const onSubmit = ({ name, password }) => {
    console.log(name);
    console.log(password);
    axios.post('/api/v1/signup', { username: String(name), password: String(password) }).then((response) => {
      const { token } = response.data
      console.log('response!!!', response);
      localStorage.setItem('username', name);
      localStorage.setItem('token', token);
      dispath(setData(token))
      navigate('/');
    })
      .catch((e) => {
        console.log('отлавливаем ошибку!!!', e);
        setShow(true)
      })
  };
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
                  alt="Регистрация"
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Имя пользователя</label>
                    <Field type="text" id="name" name="name" className="form-control" />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <Field type="text" id="password" name="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="passwordRes" className="form-label">Повторите пароль</label>
                    <Field type="passwordRes" id="passwordRes" name="passwordRes" className="form-control" />
                    <ErrorMessage name="passwordRes" component="div" className="text-danger" />
                  </div>

                  {show &&
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                      <Alert.Heading>Ошибка!</Alert.Heading>
                      <p>
                        Такой пользователь уже существует
                      </p>
                    </Alert>
                  }
                  <button type="submit" className="btn btn-primary">Отправить</button>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

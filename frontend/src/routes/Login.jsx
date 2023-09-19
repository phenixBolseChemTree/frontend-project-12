// import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import img from '../img/hexlet_human/red_flag.jpeg'
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Минимум 3 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(3, 'Минимум 2 символов')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
});

const Login = () => {
  const [show, setShow] = useState(false);

  const initialValues = {
    name: '',
    password: '',
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup')
  }

  const onSubmit = ({ name, password }) => {
    console.log(name);
    console.log(password);
    axios.post('/api/v1/login', { username: String(name), password: String(password) }).then((response) => {
      const { token } = response.data
      localStorage.setItem('username', name);
      localStorage.setItem('token', token);
      navigate('/');
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
          alt="Войти"
        />
      </Col>
      <Col md={6} className="mt-3 mt-md-0">
        <h1 className="text-center mb-4">Войти</h1>
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

            {show &&
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Ошибка!</Alert.Heading>
                <p>
                  Неправильный логин или пароль
                </p>
              </Alert>
            }

            <button type="submit" className="btn btn-primary">Отправить</button>
          </Form>
        </Formik>
      </Col>
    </Card.Body>
    <Card.Footer className="p-4">
      <div className="text-center">
        <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
      </div>
    </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default Login;

// import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
    password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const Login = () => {
  const initialValues = {
    name: '',
    password: '',
  };
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/signup')
  }

  const onSubmit = ({name, password}) => {
    console.log(name);
    console.log(password);
    axios.post('/api/v1/login', { username: String(name), password: String(password) }).then((response) => {
      const { token } = response.data
      localStorage.setItem('token', token);
      navigate('/');
    }
    );
  };
  return (
    <div className="container mt-5">
      <h1>Залогиниться</h1>
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

          <button type="submit" className="btn btn-primary">Отправить</button>
        </Form>
      </Formik>
      <button onClick={() => handleClick()}>Еще не зарегестрированы?</button>
    </div>
  );
};

export default Login;

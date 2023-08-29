// import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  lastName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  email: Yup.string().email('Неверный email').required('Обязательное поле'),
});

const Login = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const navigate = useNavigate();
  // console.log(navigate('/'));

  const onSubmit = (values) => {
    axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
      const { token } = response
      console.log(response.data); // => { token: ..., username: 'admin' }
      localStorage.setItem('token', token);
      navigate('/')
      // console.log(history);
      // history.push('/');
  }
  );
};

return (
  <div className="container mt-5">
    <h1>Здесь будет форма Formik</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Имя</label>
          <Field type="text" id="firstName" name="firstName" className="form-control" />
          <ErrorMessage name="firstName" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Фамилия</label>
          <Field type="text" id="lastName" name="lastName" className="form-control" />
          <ErrorMessage name="lastName" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <Field type="email" id="email" name="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>

        <button type="submit" className="btn btn-primary">Отправить</button>
      </Form>
    </Formik>
  </div>
);
};

export default Login;

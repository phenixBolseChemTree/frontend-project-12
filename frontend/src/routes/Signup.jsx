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
    passwordRes: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const Login = () => {
  const initialValues = {
    name: '',
    password: '',
    passwordRes: '',
  };
  const navigate = useNavigate();

  const onSubmit = ({name, password}) => {
    console.log(name);
    console.log(password);
    axios.post('/api/v1/signup', { username: String(name), password: String(password) }).then((response) => {
      const { token } = response.data
      // console.log(response.data);
      localStorage.setItem('username', name);
      localStorage.setItem('token', token);

      navigate('/');
    }
    );
  };
  return (
    <div className="container mt-5">
      <h1>Зарегестрироваться</h1>
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

          <button type="submit" className="btn btn-primary">Отправить</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

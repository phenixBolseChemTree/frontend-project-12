import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <h1>Здесь будет форма Formik</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="firstName">Имя</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Фамилия</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <button type="submit">Отправить</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import routes from '../routes';

const SignupForm = () => {
  const [signupError, setSignupError] = useState(false);
  const passwordResRef = useRef(null);

  const [isPasswordResInvalid, setIsPasswordResInvalid] = useState(false);

  const { t } = useTranslation();

  const { login } = useAuth();

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
        const response = await axios.post(routes.apiSignup, { username: name, password });
        login(response.data);
        navigate(routes.chat);
      } catch (error) {
        if (!error.isAxiosError) {
          toast(t('error.unknownError'), { type: 'error' });
        } else if (error.response.status === 409) {
          setSignupError(true);
          setIsPasswordResInvalid(true);
        } else {
          toast(t('error.networkError'), { type: 'error' });
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('login.registration')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          required
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={!!formik.errors.name}
        />
        <Form.Label htmlFor="name">{t('signup.userName')}</Form.Label>
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
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>

        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-5">

        <Form.Control
          required
          type="text"
          name="passwordRes"
          id="passwordRes"
          onChange={formik.handleChange}
          value={formik.values.passwordRes}
          isInvalid={!!formik.errors.passwordRes || isPasswordResInvalid}
          ref={passwordResRef}
        />
        <Form.Label htmlFor="passwordRes">{t('signup.resPassword')}</Form.Label>

        <Form.Control.Feedback type="invalid" tooltip>
          {signupError ? 'Такой пользователь уже существует' : formik.errors.passwordRes}

        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="outline-primary"
        className="w-100 btn btn-outline-primary"
        type="submit"
        onClick={formik.handleSubmit}
      >
        {t('signup.btnRegistration')}

      </Button>
    </Form>
  );
};

export default SignupForm;

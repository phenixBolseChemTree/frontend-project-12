import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import leoFilter from 'leo-profanity';
import { useApi } from '../context/ApiContext';
import { useAuth } from '../context/AuthContext';

const ChatForm = () => {
  const api = useApi();
  const { currentChannelId } = useSelector((state) => state.chat);

  const {
    auth: {
      username,
    },
  } = useAuth();

  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    textInputForm: yup.string().required(t('chat.formPlaceholder')),
  });

  const formik = useFormik({
    initialValues: {
      textInputForm: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const validatedText = leoFilter.clean(values.textInputForm);
      await api.newMessage({
        body: validatedText,
        username,
        channelId: currentChannelId,
      });
      resetForm();
    },
  });

  return (
    <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          type="text"
          name="textInputForm"
          aria-label={t('chat.newMessage')}
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.textInputForm}
          placeholder={t('chat.formPlaceholder')}
          onChange={formik.handleChange}
          autoFocus
        />
        <Button
          variant="light"
          type="submit"
          disabled={formik.isSubmitting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ChatForm;

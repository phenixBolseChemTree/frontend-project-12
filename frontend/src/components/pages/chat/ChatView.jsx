import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import leoFilter from 'leo-profanity';
import { useApi } from '../../ApiContext';

const currentNameChannel = (channels, id) => {
  const foundChannel = channels.find((channel) => channel.id === id);
  if (foundChannel) {
    return foundChannel.name;
  }
  return null;
};

const getCurrentMessages = (messages, selectedChannel) => messages.filter(
  ({ channelId }) => channelId === selectedChannel,
);

const ChatView = () => {
  const api = useApi();

  const inputRef = useRef(null);

  const { messages, channels, currentChannelId } = useSelector((state) => state.chat);

  const { t } = useTranslation();
  const nameChanel = currentNameChannel(channels, currentChannelId);
  const currentMessages = getCurrentMessages(messages, currentChannelId);

  const messageCount = currentMessages.length;

  const validationSchema = yup.object().shape({
    textInputForm: yup.string().required(t('chat.formPlaceholder')),
  });

  const formik = useFormik({
    initialValues: {
      textInputForm: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      leoFilter.add(leoFilter.getDictionary('ru'), leoFilter.getDictionary('en'), leoFilter.getDictionary('fr'));
      const validatedText = leoFilter.clean(values.textInputForm);

      api.newMessage({
        body: validatedText,
        username: localStorage.username,
        channelId: currentChannelId,
      });

      setSubmitting(false);

      resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [nameChanel]);

  const generateMessageKey = () => {
    if (messageCount === 1) {
      return 'key_one';
    }

    if (messageCount >= 2 && messageCount <= 4) {
      return 'key_few';
    }

    return 'key_many';
  };

  const messageKey = generateMessageKey();

  const messageText = t(`chat.messages.${messageKey}`, { count: messageCount });

  return (
    <div className="col p-0 h-100">
      <div className="chat d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {nameChanel}
            </b>
          </p>
          <span className="text-muted">{messageText}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.length !== 0
            && currentMessages.map(({ body, username, id }) => (
              <div className="text-break mb-2" key={id}>
                <b>{username}</b>
                :
                {' '}
                {body}
              </div>

            ))}
        </div>
        {/* <ChatForm /> */}
        <div className="mt-auto px-5 py-3">
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
                ref={inputRef}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={formik.isSubmitting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">{t('chat.send')}</span>
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useSelector } from "react-redux";


const currentNameChannel = (channels, id) => {
  const foundChannel = channels.find((channel) => channel.id === id);
  if (foundChannel) {
    return foundChannel.name;
  }
  return null;
};

const getCurrentMessages = (messages, selectedChannel) => {
  return messages.filter(({ channelId }) => channelId === selectedChannel);
};

const validationSchema = Yup.object().shape({
  textInputForm: Yup.string().required("Введите сообщение..."),
});

const ChatView = ({ socket }) => {
  const {messages, channels, currentChannelId} = useSelector(state => state.app);

  const { t } = useTranslation();
  const nameChanel = currentNameChannel(channels, currentChannelId);
  const currentMessages = getCurrentMessages(messages, currentChannelId);

  const messageCount = currentMessages.length;
  const messageKey = messageCount === 1 ? 'key_one' : messageCount >= 2 && messageCount <= 4 ? 'key_few' : 'key_many';
  const messageText = t(`chat.messages.${messageKey}`, { count: messageCount });

  const formik = useFormik({
    initialValues: {
      textInputForm: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      resetForm()

      filter.loadDictionary('ru');
      const validatedText = filter.clean(values.textInputForm);

      socket.emit("newMessage", {
        body: validatedText,
        username: localStorage.username,
        channelId: currentChannelId,
      });
      setSubmitting(false); // Разблокировка кнопки отправки
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="chat d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {nameChanel}</b>
          </p>
          <span className="text-muted">{messageText}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.length !== 0 &&
            currentMessages.map(({ body, username, id }) => (
              <div className="text-break mb-2" key={id}>
                <strong>{username}:</strong> {body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                type="text"
                name="textInputForm"
                value={formik.values.textInputForm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label={t('chat.newMessage')}
                className={`border-0 p-0 ps-2 form-control ${formik.touched.textInputForm &&
                  formik.errors.textInputForm
                  ? "is-invalid"
                  : ""
                  }`}
                placeholder={t('chat.formPlaceholder')}
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={formik.isSubmitting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">

                  </path></svg><span className="visually-hidden">{t('chat.send')}</span>
              </button>

            </div>
            {formik.touched.textInputForm && formik.errors.textInputForm && (
              <div className="invalid-feedback">
                {formik.errors.textInputForm}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const ChatMain = ({ messages, socket, selectedChannel, channels }) => {
  const nameChanel = currentNameChannel(channels, selectedChannel);
  const currentMessages = getCurrentMessages(messages, selectedChannel);

  const formik = useFormik({
    initialValues: {
      textInputForm: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      // console.log("Вы отправили: ", values.textInputForm);
      const username = localStorage.username;
      resetForm()
      socket.emit("newMessage", {
        body: values.textInputForm,
        username,
        channelId: selectedChannel,
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
          <span className="text-muted">{currentMessages.length} сообщений</span>
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
                className={`border-0 p-0 ps-2 form-control ${
                  formik.touched.textInputForm &&
                  formik.errors.textInputForm
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Введите сообщение..."
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={formik.isSubmitting}
              >
                Отправить
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

export default ChatMain;

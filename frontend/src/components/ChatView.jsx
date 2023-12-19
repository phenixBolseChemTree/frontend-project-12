import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Col, Container } from 'react-bootstrap';
import ChatForm from './ChatForm';

const currentNameChannel = (channels, id) => {
  const foundChannel = channels.find((channel) => channel.id === id);
  if (foundChannel) {
    return foundChannel.name;
  }
  return null;
};

const getCurrentMessages = (messages, selectedChannel) => (
  messages.filter(({ channelId }) => channelId === selectedChannel)
);

const ChatView = () => {
  const { messages, channels, currentChannelId } = useSelector((state) => state.chat);

  const { t } = useTranslation();
  const nameChannel = currentNameChannel(channels, currentChannelId);
  const currentMessages = getCurrentMessages(messages, currentChannelId);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [messages]);

  return (
    <Col className="col-9 222 p-0 d-flex flex-column h-100 chat-board ">
      <Container className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {nameChannel}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.messages.key', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map(({ body, username, id }, index) => (
            <div
              className="text-break mb-2"
              key={id}
              ref={index === currentMessages.length - 1 ? messagesEndRef : null}
            >
              <b>{username}</b>
              :
              {' '}
              {body}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatForm />
        </div>
      </Container>
    </Col>
  );
};

export default ChatView;

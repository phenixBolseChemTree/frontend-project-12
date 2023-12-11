import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="col p-0 h-100 chat-board">
      <div className="chat d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
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
        <div className="mt-auto px-5 py-3 message-box">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default ChatView;

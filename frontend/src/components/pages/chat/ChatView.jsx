import React from 'react';
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

const getCurrentMessages = (messages, selectedChannel) => messages.filter(
  ({ channelId }) => channelId === selectedChannel,
);

const ChatView = () => {
  // const {username} = useContext(aut)

  const { messages, channels, currentChannelId } = useSelector((state) => state.chat);

  const { t } = useTranslation();
  const nameChanel = currentNameChannel(channels, currentChannelId);
  const currentMessages = getCurrentMessages(messages, currentChannelId);

  const messageCount = currentMessages.length;

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
    <div className="col p-0 h-100 chat-board">
      <div className="chat d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small ">
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
        <div className="mt-auto px-5 py-3 message-box">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default ChatView;

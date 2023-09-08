import React, { useState } from "react";

const currentNameChannel = (channels, id) => {
  const foundChannel = channels.find(channel => channel.id === id);
  if (foundChannel) {
    return foundChannel.name;
  }
  return null; // или любое другое значение, которое вы хотите вернуть, если канал не найден
}

const getCurrentMessages = (messages, selectedChannel) => {
  return messages.filter(({ channelId }) => channelId === selectedChannel)
}
const ChatMain = ({ messages, socket, selectedChannel, channels }) => {
  const [textInputForm, setInputForm] = useState('');
  const nameChanel = currentNameChannel(channels, selectedChannel);
  const currentMessages = getCurrentMessages(messages, selectedChannel);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вы отправили: ', textInputForm);
    const username = localStorage.firstName;
    socket.emit('newMessage', {
      body: textInputForm, username, channelId: selectedChannel
    });
    setInputForm('');
  };

  const handleChange = (e) => {
    setInputForm(e.target.value);
  };


  return (
    <div className="col p-0 h-100">
      <div className="chat d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {nameChanel}</b></p>
          <span className="text-muted">{currentMessages.length} сообщений</span>
        </div>
        <div id='messages-box' className="chat-messages overflow-auto px-5 ">

          {messages.length !== 0 && currentMessages.map(({ body, username, id }) => (
            <div className="text-break mb-2" key={id}><strong>{username}:</strong> {body}</div>
          ))}

        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleSubmit} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input type="text" value={textInputForm} onChange={handleChange} className="border-0 p-0 ps-2 form-control" placeholder="Введите сообщение..." />
              <button type="submit" className="btn btn-group-vertical">Отправить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatMain;
import React, { useState } from "react";
const ChatMain = ({ messagesAll, socket }) => {
  console.log(123);
  const [textInputForm, setInputForm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вы отправили: ', textInputForm);
    const username = localStorage.firstName;
    socket.emit('newMessage', { body: textInputForm, username, channelId: 1 });
    setInputForm('');
  };

  const handleChange = (e) => {
    setInputForm(e.target.value);
  };


  return (
    <div className="col-md-9">
      <div className="chat">
        <h3>Чат</h3>
        <ul className="list-group">
          <div className="list-group-item">
            {messagesAll.length !== 0 && messagesAll.map(({ body, username, id }) => (
              <div key={id}><strong>{username}:</strong> {body}</div>
            ))}
          </div>
        </ul>
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
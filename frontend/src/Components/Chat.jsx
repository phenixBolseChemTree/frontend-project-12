import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../Redux/channelsSlice';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3000/");
const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.app);
  const [textInputForm, setInputForm] = useState('');
  const [messagesState, setMessages] = useState([]); 

  const token = localStorage.token
  useEffect(() => {
    if (token === undefined) {
      navigate('/login');
    } else {
      axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(addChannel(response.data));
      });
    }
      socket.on('newMessage', (message) => {
        console.log('message', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  }, [dispatch, navigate, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вы отправили: ', textInputForm);
    const username = localStorage.firstName;
    socket.emit('newMessage', { body: textInputForm, username, channelId: 1 });
    setInputForm('')
  };
  
  const handleChange = (e) => {
    setInputForm(e.target.value);
  };

  const { channels, messages } = chatData;
  console.log('channels', channels);
  console.log('!!!messages', messages);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="channel-list">
            <h3>Каналы</h3>
            <ul className="list-group">
              {channels.length !== 0 && channels.map(({ id, name }) => (
                <li key={id} className="list-group-item border border-dark">{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="chat">
            <h3>Чат</h3>
            <ul className="list-group">
              <div className="list-group-item">
                {messagesState.length !== 0 && messagesState.map(({body, username, id}) => (
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
      </div>
    </div>
  );
}

export default Chat
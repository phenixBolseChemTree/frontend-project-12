import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../Redux/channelsSlice';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.app);
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
  }, [dispatch, navigate, token]);

  console.log('chatData', chatData);
  const { channels, messages } = chatData; // alse messages
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="channel-list">
            <h3>Каналы</h3>
            <ul className="list-group">
              {channels.length && channels.map(({ id, name }) => (
                <li key={id} className="list-group-item border border-dark">{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="chat">
            <h3>Чат</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <h2>Поле с будущим чатом</h2>
                {/* {messages.length && messages.map(({message}))} */}
              </li>
            </ul>
            <div className="message-form mt-3">
              <input type="text" className="form-control border border-dark" placeholder="Введите сообщение..." />
              <button className="btn btn-primary mt-2 border border-dark">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat
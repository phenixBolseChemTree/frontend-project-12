import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../Redux/channelsSlice';
import Chanells from '../Components/Chanells';
import ChatMain from "./ChatMain";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000/");

const Chat = () => {
  console.log(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.app);
  const [messagesState, setMessages] = useState([]);

  const token = localStorage.token;

  useEffect(() => {
    if (token === undefined) {
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token !== undefined) {
      axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(addChannel(response.data));
      });

      socket.on('newMessage', (message) => {
        console.log('message!@#!@', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [dispatch, token]);

  const { channels, messages } = chatData;
  console.log('!!!chatData', chatData)
  console.log('!!!channels', channels);
  console.log('!!!messages', messages);
  let messagesAll = [...messages];
  messagesAll = [...messagesAll, ...messagesState];
  return (
    <div className="container">
      <div className="row">
        <Chanells channels={channels} socket={socket} />
        <ChatMain messagesAll={messagesAll} socket={socket} />
      </div>
    </div>
  );
}

export default Chat
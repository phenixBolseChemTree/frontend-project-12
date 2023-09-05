import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../Redux/channelsSlice';
import Chanells from '../Components/Chanells';
import ChatMain from "../Components/ChatMain";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000/");

const INITIAL_CHANNEL = 1

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState(INITIAL_CHANNEL);

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

  useEffect(() => {
    // console.log('selectedChannel', selectedChannel)
    socket.on('newChannel', (payload) => {
      console.log(payload) // { id: 6, name: "new channel", removable: true }
    });
  }, [
    selectedChannel
  ])

  const { channels, messages } = chatData;
  console.log('!!!chatData', chatData)
  console.log('!!!channels', channels);
  console.log('!!!messages', messages);
  let messagesAll = [...messages];
  messagesAll = [...messagesAll, ...messagesState];
  return (
    <div className="container">
      <div className="row">
        SelectedChannel: {selectedChannel}
        <Chanells selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} channels={channels} socket={socket} />
        <ChatMain selectedChannel={selectedChannel} messagesAll={messagesAll} socket={socket} />
      </div>
    </div>
  );
}

export default Chat
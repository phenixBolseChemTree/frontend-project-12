import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../Redux/channelsSlice';
import Chanells from '../Components/Chanells';
import ChatMain from "../Components/ChatMain";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000/");

const getData = (action, dispatch) => {
  socket.on(action, () => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    }).then((response) => {
      dispatch(addChannel(response.data));
    });
  })
}

const INITIAL_CHANNEL = 1

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState(INITIAL_CHANNEL);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.app);
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
    }
  }, [dispatch, token]);

  useEffect(() => {
    getData('newMessage', dispatch)
    getData('newChannel', dispatch)
    getData('removeChannel', dispatch)
    getData('editChannel', token, dispatch)
  }, [
    selectedChannel, dispatch, token
  ])

  const { channels, messages } = chatData;
  console.log('!!!chatData', chatData)
  return (
    <div className="container">
      <div className="row">
        SelectedChannel: {selectedChannel}
        <Chanells selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} channels={channels} socket={socket} />
        <ChatMain selectedChannel={selectedChannel} messages={messages} socket={socket} />
      </div>
    </div>
  );
}

export default Chat
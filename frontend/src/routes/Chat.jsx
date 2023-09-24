import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel, addChatData } from '../Redux/chatSlice';
import Chanells from '../Components/Chanells';
import ChatMain from "../Components/ChatMain";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { useTranslation } from "react-i18next";



const socket = io.connect("http://localhost:3000/");

const getData = (action, dispatch) => {
  socket.on(action, (payload) => {
    switch (action) {
      case 'newMessage':
        console.log('newMessage', payload);
        dispatch(setNewMessage(payload));
        break;
      case 'newChannel':
        console.log('newChannel');
        dispatch(setNewChannel(payload));
        break;
      case 'removeChannel':
        console.log('removeChannel');
        dispatch(setRemoveChannel(payload));
        break;
      case 'renameChannel':
        console.log('renameChannel');
        dispatch(setRenameChannel(payload));
        break;
      default:
        return
    }
  }
  );
};

const INITIAL_CHANNEL = 1

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState(INITIAL_CHANNEL);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.app);
  const { t } = useTranslation();
  const token = localStorage.token;

  useEffect(() => {
    if (token === undefined) {
      navigate('/login');
      return;
    }
  })

  useEffect(() => {
    getData('newMessage', dispatch)
    getData('newChannel', dispatch)
    getData('removeChannel', dispatch)
    getData('renameChannel', dispatch)
  }, [navigate, token, dispatch]);

  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(addChatData(response.data));
    }).catch((e) => {
      toast(t('toast.networkError'), {
        type: 'danger', position: 'top-right'
      });
    })

  }, [dispatch, token, t]);

  useEffect(() => {
  }, [
    dispatch, token
  ])

  const { channels, messages, currentChannelId } = chatData;
  return (
    <div className=" h-100 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Chanells selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} channels={channels} socket={socket} />
        <ChatMain selectedChannel={selectedChannel} messages={messages} socket={socket} channels={channels} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default Chat
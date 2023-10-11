import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import {
  addChatData,
} from '../Redux/chatSlice';
import Channels from '../сomponents/Сhannels';
import ChatView from '../сomponents/ChatView';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.app);
  console.log('!!!rerenderChat - chatData ===', chatData);
  const { t } = useTranslation();
  const { token } = localStorage;

  // сначала берем данные из useContent и вставляем их
  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(addChatData(response.data));
    }).catch(() => {
      navigate('/login');
    });
  }, [dispatch, token, t, navigate]);

  const { channels, messages } = chatData;
  return (
    <div className=" h-100 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={channels} />
        <ChatView messages={messages} channels={channels} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;

import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  addChatData,
} from '../slice/chatSlice';
import Channels from '../сomponents/messenger/Сhannels';
import ChatView from '../сomponents/messenger/ChatView';
import routes from '../routes';
import ModalWindow from '../сomponents/modal/ModalWindow';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat);
  const { t } = useTranslation();
  const { token } = localStorage;

  useEffect(() => {
    axios.get(routes.data, {
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
        <ModalWindow />
      </div>
    </div>
  );
};

export default Chat;

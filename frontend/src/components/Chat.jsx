import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  addChatData,
} from '../slice/index';
import Channels from './Сhannels';
import ChatView from './ChatView';
import { useAuth } from '../context/AuthContext';
import routes from '../routes';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat);
  const { t } = useTranslation();

  const { getAuthObject, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObj = getAuthObject();
        const response = await axios.get(routes.data, authObj);

        dispatch(addChatData(response.data));
      } catch (error) {
        if (!error.isAxiosError) {
          toast(t('error.unknownError'), { type: 'error' });
        } else if (error.response?.status === 401) {
          logout();
          navigate('/login');
        } else {
          toast(t('error.networkError'), { type: 'error' });
        }
      }
    };

    fetchData();
  }, [dispatch, t, navigate, getAuthObject, logout]);

  const { channels, messages } = chatData;

  return (
    <div className=" chat w-100 h-100 overflow-hidden rounded shadow">
      <div className="chat-container row h-100 bg-white flex-md-row">
        <Channels channels={channels} />
        <ChatView messages={messages} channels={channels} />
      </div>
    </div>
  );
};

export default Chat;

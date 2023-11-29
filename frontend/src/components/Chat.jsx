import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  addChatData,
} from '../slice/index';
import Channels from './Сhannels';
import ChatView from './ChatView';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat);
  const { t } = useTranslation();

  const { me } = useAuth();

  console.log('!!!renderChat');

  useEffect(() => {
    console.log('!!chat useeffect111', me);
    const fetchData = async () => {
      try {
        const response = await me();
        dispatch(addChatData(response.data));
      } catch (error) {
        navigate('/login');
      }
    };

    fetchData();
  }, [dispatch, t, navigate, me]);

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

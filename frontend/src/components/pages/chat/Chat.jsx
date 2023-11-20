import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  addChatData,
} from '../../../slice/index';
import Channels from './Сhannels';
import ChatView from './ChatView';
import routes from '../../../routes';
import { AuthContext } from '../../AuthContext';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat);
  const { t } = useTranslation();

  const { context } = useContext(AuthContext);

  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const hasToken = context?.token;

    if (!hasToken) {
      navigate('/login');
      return;
    }

    axios.get(routes.data, {
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    }).then((response) => {
      dispatch(addChatData(response.data));
    }).catch(() => {
      if (context.token) {
        toast(t('toast.networkError'), { type: 'error' });
        navigate('/login');
      } else {
        navigate('/login');
      }
    }).finally(() => {
      setIsPageLoading(true);
    });
  }, [dispatch, t, navigate, context?.token]);

  const { channels, messages } = chatData;

  if (!isPageLoading) {
    return null;
  }

  return (
    <div className=" chat h-100 overflow-hidden rounded shadow">
      <div className="chat-container row h-100 bg-white flex-md-row">
        <Channels channels={channels} />
        <ChatView messages={messages} channels={channels} />
      </div>
    </div>
  );
};

export default Chat;

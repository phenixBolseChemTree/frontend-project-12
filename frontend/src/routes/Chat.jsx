import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import {
  addChatData, setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel,
} from '../Redux/chatSlice';
import Channels from '../сomponents/Сhannels';
import ChatView from '../сomponents/ChatView';

const socket = io.connect('http://localhost:3000/');

const Chat = () => {
  console.log('!!!rerenderChat');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.app);
  const { t } = useTranslation();
  const { token } = localStorage;

  useEffect(() => {
    const getData = (action) => {
      socket.on(action, (payload) => {
        switch (action) {
          case 'newMessage':
            console.log('newMessage', payload);
            if (localStorage.username !== payload.username) {
              dispatch(setNewMessage(payload));
            }

            break;
          case 'newChannel':
            console.log('newChannel');
            // dispatch(setNewChannel(payload));

            if (localStorage.username !== payload.username) {
              dispatch(setNewChannel(payload));
            }
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
        }
      });
    };

    getData('newMessage');
    getData('newChannel');
    getData('removeChannel');
    getData('renameChannel');
  }, [dispatch]);

  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(addChatData(response.data));
    }).catch(() => {
      navigate('/login');
      //   toast(t('toast.networkError'), { // выводить если долгий запрос
      //     type: 'danger', position: 'top-right'
      //   });
    });
  }, [dispatch, token, t, navigate]);

  const { channels, messages } = chatData;
  return (
    <div className=" h-100 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={channels} socket={socket} />
        <ChatView messages={messages} socket={socket} channels={channels} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;

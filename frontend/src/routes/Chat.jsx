import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel, addChatData } from '../Redux/chatSlice'
import Channels from "../components/Сhannels"
import ChatView from "../components/ChatView";
import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import { useTranslation } from "react-i18next";
// import { toast } from 'react-toastify';


const socket = io.connect("http://localhost:3000/");

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.app);
  const { t } = useTranslation();
  const token = localStorage.token;

  useEffect(() => {
    const getData = (action) => {
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
            return;
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
    }).catch((e) => {
      navigate('/login');
      //   toast(t('toast.networkError'), { // выводить если долгий запрос
      //     type: 'danger', position: 'top-right'
      //   });
    })

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
}

export default Chat
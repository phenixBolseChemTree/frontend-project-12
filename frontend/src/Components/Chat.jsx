import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const token = localStorage.token
  useEffect(() => {
    if (token === undefined) {
      navigate('/login');
    } else {
      axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
      });
    }
  }, []);
  return (
    <>
      <h1>Hello from chat</h1>
    </>
  )
}

export default Chat
import React from "react";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const token = localStorage.token
  if (token === undefined) {
    Promise.resolve()
      .then(() => navigate('/login'))
  }
  return (
    <>
      <h1>Hello from chat</h1>
    </>
  )
}

export default Chat
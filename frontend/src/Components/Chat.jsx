import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const token = localStorage.token
    useEffect(() => {
      if (token === undefined) {
        // setTimeout(() => {
          navigate('/login');
        // }, 0);
      }
    }, []);
  return (
    <>
      <h1>Hello from chat</h1>
    </>
  )
}

export default Chat
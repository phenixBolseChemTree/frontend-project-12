import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import Chat from './Chat';

const RenderChat = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { token } = user;

  useEffect(() => {
    console.log('token', token);
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? <Chat /> : null;
};

export default RenderChat;

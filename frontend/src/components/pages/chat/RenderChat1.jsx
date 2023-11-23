import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Chat from './Chat';

const RenderChat = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const { token } = auth.user;

  useEffect(() => {
    console.log('token', token);
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? <Chat /> : null;
};

export default RenderChat;

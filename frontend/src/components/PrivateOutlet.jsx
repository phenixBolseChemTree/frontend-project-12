import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Chat from './Chat';

const PrivateOutlet = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const token = auth.user?.token;

  console.log('token', token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? <Chat /> : null;
};

export default PrivateOutlet;

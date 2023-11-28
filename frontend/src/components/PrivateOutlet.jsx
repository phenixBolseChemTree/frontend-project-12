import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateOutlet = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const token = auth.user?.token;

  console.log('token', token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default PrivateOutlet;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateOutlet = ({ children }) => {
  console.log('!!!private outlet');
  const navigate = useNavigate();
  const { auth } = useAuth();

  console.log('!!!auth', auth);

  const token = auth?.token;

  console.log('!!!token', token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default PrivateOutlet;

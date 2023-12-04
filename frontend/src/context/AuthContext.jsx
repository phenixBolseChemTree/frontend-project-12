import axios from 'axios';
import React, {
  useState, createContext, useMemo, useCallback, useContext,
} from 'react';
import routes from '../routes';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || null);

  const logout = useCallback(() => {
    localStorage.removeItem('auth');

    setAuth(null);
  }, []);

  const login = useCallback((data) => {
    localStorage.setItem('auth', JSON.stringify(data));

    setAuth(data);
  }, []);

  const data = useCallback(() => axios.get(routes.data, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  }), [auth]);

  const authContextValue = useMemo(() => ({
    auth, login, logout, data,
  }), [auth, logout, login, data]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };

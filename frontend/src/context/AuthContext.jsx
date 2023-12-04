// import axios from 'axios';
import React, {
  useState, createContext, useMemo, useCallback, useContext,
} from 'react';
// import routes from '../routes';

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

  // const data = useCallback(() => axios.get(routes.data, {
  //   headers: {
  //     Authorization: `Bearer ${auth.token}`,
  //   },
  // }), [auth]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAuthObject = () => ({
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const authContextValue = useMemo(() => ({
    auth, login, logout, getAuthObject,
  }), [auth, logout, login, getAuthObject]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };

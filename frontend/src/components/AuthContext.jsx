import React, {
  useState, createContext, useMemo, useCallback, useEffect,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setUsername(localStorage.getItem('username'));
  }, [isLoggedIn]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const authContextValue = useMemo(() => {
    const login = () => {
      setIsLoggedIn(true);
    };
    return {
      isLoggedIn, login, logout, token, username,
    };
  }, [isLoggedIn, logout, token, username]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

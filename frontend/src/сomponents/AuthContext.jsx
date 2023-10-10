import React, {
  useState, createContext, useMemo, useCallback,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const authContextValue = useMemo(() => {
    const login = () => {
      setIsLoggedIn(true);
    };
    return { isLoggedIn, login, logout };
  }, [isLoggedIn, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

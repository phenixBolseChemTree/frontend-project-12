import React, {
  useState, createContext, useMemo, useCallback,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')) || null);

  const logout = useCallback(() => {
    localStorage.removeItem('auth');

    setUser(null);
  }, []);

  const login = useCallback((data) => {
    localStorage.setItem('auth', JSON.stringify(data));

    setUser(data);
  }, []);

  const authContextValue = useMemo(() => ({
    user, login, logout,
  }), [user, logout, login]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

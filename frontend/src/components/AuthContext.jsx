import React, {
  useState, createContext, useMemo, useCallback,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [context, setContext] = useState(JSON.parse(localStorage.getItem('auth')) || null);

  const logout = useCallback(() => {
    localStorage.removeItem('auth');

    setContext(null);
  }, []);

  const login = useCallback((data) => {
    localStorage.setItem('auth', JSON.stringify(data));

    setContext(data);
  }, []);

  const authContextValue = useMemo(() => ({
    context, login, logout,
  }), [context, logout, login]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

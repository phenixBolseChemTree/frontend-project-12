import React, {
  useState, createContext, useMemo, useCallback,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [context, setContext] = useState(
    (localStorage.getItem('token') && localStorage.getItem('username'))
      ? {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
      } : null,
  );

  console.log('!!!context', context);

  const logout = useCallback(() => {
    localStorage.clear();

    setContext(null);
  }, []);

  const login = useCallback((data) => {
    console.log('!!!saveLogin (data)', {
      data,
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);

    console.log('!!!setcontext');

    setContext({
      token: data.token,
      username: data.username,
    });
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

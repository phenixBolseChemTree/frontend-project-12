import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const useApi = () => useContext(SocketContext);

const ApiProvider = ({ children }) => {
  const socket = io();
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { useApi, ApiProvider };

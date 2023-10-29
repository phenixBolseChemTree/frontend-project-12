import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = io();
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
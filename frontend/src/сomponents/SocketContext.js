import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  console.log('ПРОВАЙДЕР ВЫПОЛНИЛСЯ!!!!!!!!!!!!!!!!!!!');
  const socket = io.connect('http://localhost:3000');
  console.log('socketsocketsocketsocketsocketsocket!!!!!', socket);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };

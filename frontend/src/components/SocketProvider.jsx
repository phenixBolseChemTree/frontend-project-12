import React, { createContext, useContext } from 'react';

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export { useSocket, SocketProvider };

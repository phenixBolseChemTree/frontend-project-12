import React, { createContext, useContext } from 'react';

const SocketContext = createContext();

const useApi = () => useContext(SocketContext);

const ApiProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export { useApi, ApiProvider };

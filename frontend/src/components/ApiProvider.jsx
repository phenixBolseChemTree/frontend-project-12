import { createContext, useContext } from 'react';

const SocketContext = createContext();

const useApi = () => useContext(SocketContext);

export { useApi, SocketContext };

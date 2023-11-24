import { createContext, useContext } from 'react';

const ApiContext = createContext();

const useApi = () => useContext(ApiContext);

export { useApi, ApiContext };

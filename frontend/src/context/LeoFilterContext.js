import { createContext, useContext } from 'react';

const LeoFilterContext = createContext();

const useLeoFilter = () => useContext(LeoFilterContext);

export { useLeoFilter, LeoFilterContext };

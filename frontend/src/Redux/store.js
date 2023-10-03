import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from "./rootReducer";
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    app: chatSlice,
  },
});

export default store;

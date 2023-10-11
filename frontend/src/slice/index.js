import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './chatSlice'; // Импортируйте редьюсер

const reducer = combineReducers({
  chat: chatReducer,
});

export default reducer;

import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import modalSlice from './modalSlice';

const reducer = combineReducers({
  chat: chatReducer,
  modal: modalSlice,
});

export default reducer;

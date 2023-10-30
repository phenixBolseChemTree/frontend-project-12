import { combineReducers } from '@reduxjs/toolkit';
import chatReducer, {
  addChatData,
  setNewMessage,
  setNewChannel,
  setRemoveChannel,
  setRenameChannel,
  setCurrentChannelId,
} from './chatSlice';
import modalSlice, {
  openModal, closeModal, loadingOff, loadingOn,
} from './modalSlice';
import socketSlice, { setSocket, getSocket } from './socketSlice';

const reducer = combineReducers({
  chat: chatReducer,
  modal: modalSlice,
  socket: socketSlice,
});

export default reducer;

export {
  addChatData,
  setNewMessage,
  setNewChannel,
  setRemoveChannel,
  setRenameChannel,
  setCurrentChannelId,
  openModal,
  closeModal,
  loadingOff,
  loadingOn,
  setSocket,
  getSocket,
};

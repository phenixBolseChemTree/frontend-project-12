import { combineReducers } from '@reduxjs/toolkit';
import chatReducer, {
  addChatData,
  setNewMessage,
  setNewChannel,
  setRemoveChannel,
  setRenameChannel,
  setCurrentChannelId,
} from './chatSlice';
import modalSlice, { openModal, closeModal } from './modalSlice';

const reducer = combineReducers({
  chat: chatReducer,
  modal: modalSlice,
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
};

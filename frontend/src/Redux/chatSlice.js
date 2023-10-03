import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannelId: (state, action) => {
      console.log('action!!! этот id выбран', action.payload);
      return { ...state, currentChannelId: action.payload }
    },
    addChatData: (state, action) => {
      return action.payload;
    },
    setNewMessage: (state, action) => {
      console.log('action!!!', action.payload);
      return { ...state, messages: [...state.messages, action.payload] }
    },
    setNewChannel: (state, action) => {
      console.log('action!!!', action.payload);
      return { ...state, channels: [...state.channels, action.payload], currentChannelId: action.payload.id };
    },
    setRemoveChannel: (state, action) => {
      console.log('action!!!', action.payload);
      const newChannels = state.channels.filter((channel) => {
        return channel.id !== action.payload.id; // Возвращаем true для сохранения элемента, false для удаления
      });

      if (state.currentChannelId !== action.payload.id) {
        return { ...state, channels: [...newChannels] };
      } else {
        return { ...state, channels: [...newChannels], currentChannelId: 1 };
      }
    },
    setRenameChannel: (state, action) => {
      const { id, name } = action.payload;
      const updatedChannels = state.channels.map((channel) => {
        if (channel.id === id) {
          return { ...channel, name: name };
        } else { return channel }
      });

      return { ...state, channels: [...updatedChannels] };
    },
  },
});

export const { addChatData, setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel, setCurrentChannelId } = chatSlice.actions;
export default chatSlice.reducer;
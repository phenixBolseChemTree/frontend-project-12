import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannelId: (state, action) => ({ ...state, currentChannelId: action.payload }),
    addChatData: (state, action) => action.payload,
    setNewMessage: (state, action) => ({ ...state, messages: [...state.messages, action.payload] }),
    setNewChannel: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
      currentChannelId: action.payload.id,
    }),
    setRemoveChannel: (state, action) => {
      const newChannels = state.channels.filter(
        (channel) => channel.id !== action.payload.id,
      );

      if (state.currentChannelId !== action.payload.id) {
        return { ...state, channels: [...newChannels] };
      }
      return { ...state, channels: [...newChannels], currentChannelId: 1 };
    },
    setRenameChannel: (state, action) => {
      const { id, name } = action.payload;
      const updatedChannels = state.channels.map((channel) => {
        if (channel.id === id) {
          return { ...channel, name };
        } return channel;
      });

      return { ...state, channels: [...updatedChannels] };
    },
  },
});

export const {
  addChatData,
  setNewMessage,
  setNewChannel,
  setRemoveChannel,
  setRenameChannel,
  setCurrentChannelId,
} = chatSlice.actions;
export default chatSlice.reducer;

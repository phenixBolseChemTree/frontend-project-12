import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
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
      const newChannel = state.channels.filter((channel) => {
        if (channel.id !== action.payload.id) {
          return channel;
        }
      })
      console.log('newChannel!!!', newChannel);
      const newCurrentChannelId = state.currentChannelId !== action.payload.id ? '1' : state.currentChannelId;

      return { ...state, channels: [...newChannel], currentChannelId: newCurrentChannelId };
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

export const { addChatData, setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
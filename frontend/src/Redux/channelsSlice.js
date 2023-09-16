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
      console.log('state!!!', state.channels);
      console.log('action!!!', action.payload);
      // const newMessages = [...state.messages, action.payload];
      return { ...state, messages: [...state.messages, action.payload]}
    },
    setNewChannel: (state, action) => {
      console.log('state!!!', state);
      console.log('action!!!', action.payload);
      return { ...state };
    },
    setRemoveChannel: (state, action) => {
      console.log('state!!!', state);
      console.log('action!!!', action.payload);
      return state;
    },
    setRenameChannel: (state, action) => {
      console.log('state!!!', state);
      console.log('action!!!', action.payload);
      return state;
    },
  },
});

export const { addChatData, setNewMessage, setNewChannel, setRemoveChannel, setRenameChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
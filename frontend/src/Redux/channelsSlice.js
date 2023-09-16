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
  },
});

export const { addChatData, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
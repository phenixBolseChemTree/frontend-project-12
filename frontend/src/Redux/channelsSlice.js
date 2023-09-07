import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, action) => {
      // console.log('channels123', action);
      return action.payload;
    },
  },
});

export const { addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
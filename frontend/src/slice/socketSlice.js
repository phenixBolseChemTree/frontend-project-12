import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    io: null,
  },
  reducers: {
    setSocket: (state, action) => ({
      ...state,
      io: action.payload,
    }),
    getSocket: (state) => state.io,
  },
});

export const { setSocket, getSocket } = socketSlice.actions;
export default socketSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    isOpened: false,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      isOpened: true,
      type: payload.type,
      extra: payload.id,

    }),
    closeModal: (state) => ({
      ...state,
      isOpened: false,
      type: null,
      extra: null,
    }),
  },
});

export const {
  openModal, closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;

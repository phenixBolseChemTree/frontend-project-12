import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    typeModal: null,
    isOpened: false,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      isOpened: true,
      typeModal: payload.type,
      extra: payload.id,

    }),
    closeModal: (state) => ({
      ...state,
      isOpened: false,
      typeModal: null,
      extra: null,
    }),
  },
});

export const {
  openModal, closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;

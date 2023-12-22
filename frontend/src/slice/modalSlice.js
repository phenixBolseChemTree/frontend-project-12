import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    typeModal: null,
    isOpened: false,
    modalId: '1',
  },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      isOpened: true,
      typeModal: payload.type,
      modalId: payload.id,

    }),
    closeModal: (state) => ({
      ...state,
      isOpened: false,
      typeModal: null,
      modalId: null,
    }),
  },
});

export const {
  openModal, closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;

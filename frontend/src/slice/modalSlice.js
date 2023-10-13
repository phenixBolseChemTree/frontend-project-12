import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    typeModal: null,
    modalStatus: false,
  },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      modalStatus: true,
      typeModal: payload.type,
    }),
    closeModal: (state) => ({
      ...state,
      modalStatus: false,
      typeModal: null,
    }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    typeModal: null,
    modalStatus: false,
    modalId: '1',
    isLoading: false,
  },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      modalStatus: true,
      typeModal: payload.type,
      modalId: payload.id,

    }),
    closeModal: (state) => ({
      ...state,
      modalStatus: false,
      typeModal: null,
      modalId: null,
    }),
    loadingOff: (state) => ({
      ...state,
      isLoading: false,
    }),
    loadingOn: (state) => ({
      ...state,
      isLoading: true,

    }),
  },
});

export const {
  openModal, closeModal, loadingOff, loadingOn,
} = modalSlice.actions;
export default modalSlice.reducer;

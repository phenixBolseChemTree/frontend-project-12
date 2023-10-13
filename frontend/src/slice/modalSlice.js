import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    typeModal: null,
    isShow: false,
  },
  reducers: {
    openModal: (state, payload) => {
      const typeModal = payload.type; // тип окна которое нужно открыть
      return { typeModal: payload.type, isShow: true };
    },
    closeModal: (state) => {
      const isShow = false;
      return { typeModal: null, isShow };
    },
  },
});

export const { setData, showModal, unShowModal } = modalSlice.actions;
export default modalSlice.reducer;

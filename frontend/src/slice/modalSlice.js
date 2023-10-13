import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    typeModal: null,
    isShow: false,
  },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      isShow: true,
      typeModal: payload.type,
    }),
    closeModal: (state) => ({
      ...state,
      isShow: false,
      typeModal: null,
    }),
  },
});

export const { setData, showModal, unShowModal } = modalSlice.actions;
export default modalSlice.reducer;

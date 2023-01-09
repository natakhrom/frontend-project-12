/* eslint-disable no-param-reassign */
import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log(action.payload);
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsOpen = (state) => state.modal;

export default modalSlice.reducer;

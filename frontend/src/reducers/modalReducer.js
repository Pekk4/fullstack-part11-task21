import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: null, style: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal(state, action) {
      state.message = action.payload.message;
      state.style = action.payload.style || null;
    },
    clearModal(state) {
      state.message = null;
      state.style = null;
    },
  },
});

export const { setModal, clearModal } = modalSlice.actions;

export const showModal = (message, style) => {
  return (dispatch) => {
    dispatch(setModal({ message: message, style: style }));
    setTimeout(() => {
      dispatch(clearModal());
    }, 3000);
  };
};

export default modalSlice.reducer;

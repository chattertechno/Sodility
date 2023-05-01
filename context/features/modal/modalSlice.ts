import { createSlice } from "@reduxjs/toolkit";

// type ModalState = {
//   showModal: boolean;
// }

// Initial State ============================
const initialState = {
  showModal: false,
  name: "",
};

// Slice ============================
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.name = action.payload;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.name = "";
      state.showModal = false;
    },
  },
});

// Exports ==============================================
export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;

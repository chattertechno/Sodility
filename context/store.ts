import { configureStore } from "@reduxjs/toolkit";

// Reducers ============================
import modalReducer from "./features/modal/modalSlice";

// Store ============================
const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

// Exports ==============================================
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

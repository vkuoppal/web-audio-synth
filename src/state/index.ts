import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { applicationSlice } from "./slice";
import { enableMapSet } from "immer";

enableMapSet();

const store = configureStore({
  reducer: applicationSlice.reducer,
  middleware: [thunk],
});

export const actions = applicationSlice.actions;

export { store };

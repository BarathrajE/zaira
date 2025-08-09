import { configureStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./reducer/login";

export const Store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

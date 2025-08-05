import { configureStore } from "@reduxjs/toolkit";


export const Store = configureStore({
  reducer: {
   
  },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

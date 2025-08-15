import { configureStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./reducer/login";
import { menuReducer } from "./reducer/manu/menuGet";
import { submenuReducer } from "./reducer/manu/submenu";
import { bannerreducer } from "./reducer/banner/homebanner";
import { allProductReducer } from "./reducer/product/allProduct";

export const Store = configureStore({
  reducer: {
    login: LoginReducer,
    menuGet: menuReducer,
    submenu: submenuReducer,
    home: bannerreducer,
    allProduct: allProductReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

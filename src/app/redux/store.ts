import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { LoginReducer } from "./reducer/login";
import { menuReducer } from "./reducer/manu/menuGet";
import { submenuReducer } from "./reducer/manu/submenu";
import { bannerreducer } from "./reducer/banner/homebanner";
import { allProductReducer } from "./reducer/product/allProduct";
import { tradingProductReducer } from "./reducer/product/treadingproduct";
import { bestServiceReducer } from "./reducer/product/bestservice";
import { videoReducer } from "./reducer/videofile/video";
import { collectionMenuReducer } from "./reducer/manu/collection";
import addressReducer from "./reducer/profile/address";
import { GETaddressReducer } from "./reducer/profile/addressGet";
import { updateAddressReducer } from "./reducer/profile/addressPut";
import { getWishlistReducer } from "./reducer/wishlist/getwishlist";
import { addWishlistReducer } from "./reducer/wishlist/addwishlist";
import { removeWishlistReducer } from "./reducer/wishlist/deletewishlist";
import { deleteAddressReducer } from "./reducer/profile/addressDelete";
import { homeTshirtReducer } from "./reducer/banner/homeTshirt";
import { trendingProductsReducer } from "./reducer/mens/tranding";
import { addCartReducer } from "./reducer/cart/addCart";
import { deleteCartReducer } from "./reducer/cart/deletetoCart";
import { getCartReducer } from "./reducer/cart/getCart";
import { updateCartReducer } from "./reducer/cart/putcart";
import { galleryReducer } from "./reducer/mens/gallery";
import { orderReducer } from "./reducer/order/createOrder";
import { getOrdersReducer } from "./reducer/order/getOrder";
import { getAllOrdersReducer } from "./reducer/order/allUserOrder";
import { updateOrderReducer } from "./reducer/order/updateOrder";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // persist only login reducer
};

const persistedLoginReducer = persistReducer(persistConfig, LoginReducer);

export const Store = configureStore({
  reducer: {
    login: persistedLoginReducer,
    menuGet: menuReducer,
    submenu: submenuReducer,
    home: bannerreducer,
    allProduct: allProductReducer,
    tradingProduct: tradingProductReducer,
    bestService: bestServiceReducer,
    video: videoReducer,
    collection: collectionMenuReducer,
    address: addressReducer,
    AddressGet: GETaddressReducer,
    AddressPut: updateAddressReducer,
    addressDelete: deleteAddressReducer,
    getWishlist: getWishlistReducer,
    addWishlist: addWishlistReducer,
    removeWishlist: removeWishlistReducer,
    homeTshirt: homeTshirtReducer,
    getTrendingProducts: trendingProductsReducer,
    detelecart: deleteCartReducer,
    addcart: addCartReducer,
    getcart: getCartReducer,
    putcart: updateCartReducer,
    getgallery: galleryReducer,
    CreateOrder: orderReducer,
    Getorders: getOrdersReducer,
    getAllorders: getAllOrdersReducer,
    updateOrder: updateOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

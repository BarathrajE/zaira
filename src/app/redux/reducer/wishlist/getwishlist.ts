/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_WISHLIST_FAILURE,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
} from "../../actiontype";

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const getWishlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_WISHLIST_SUCCESS:
      return { ...state, loading: false, wishlist: action.payload || [] };
    case GET_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

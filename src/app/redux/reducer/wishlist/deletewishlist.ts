/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REMOVE_WISHLIST_FAILURE,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
} from "../../actiontype";

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const removeWishlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REMOVE_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: state.wishlist.filter(
          (item: any) => item.id !== action.payload.id
        ),
      };
    case REMOVE_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

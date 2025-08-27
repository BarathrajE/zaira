/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_WISHLIST_FAILURE,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
} from "../../actiontype";

interface WishlistState {
  loading: boolean;
  wishlist: any[];
  error: string | null;
}

const initialState: WishlistState = {
  loading: false,
  wishlist: [],
  error: null,
};

export const addWishlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: [...state.wishlist, action.payload],
      };
    case ADD_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

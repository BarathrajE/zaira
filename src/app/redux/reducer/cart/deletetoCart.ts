/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_FAILURE,
} from "../../actiontype";

const initialDeleteCartState = {
  loading: false,
  cart: [], // updated cart after deletion
  error: null,
};

export const deleteCartReducer = (state = initialDeleteCartState, action: any) => {
  switch (action.type) {
    case DELETE_FROM_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_FROM_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload };
    case DELETE_FROM_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

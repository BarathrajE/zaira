/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
} from "../../actiontype";

const initialGetCartState = {
  loading: false,
  cart: [], // cart items
  error: null,
};

export const getCartReducer = (state = initialGetCartState, action: any) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload };
    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

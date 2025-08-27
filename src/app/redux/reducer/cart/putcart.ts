/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
} from "../../actiontype";

const initialUpdateCartState = {
  loading: false,
  cart: { items: [], totalPrice: 0 }, // updated cart
  error: null,
};

export const updateCartReducer = (state = initialUpdateCartState, action: any) => {
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload, error: null };
    case UPDATE_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

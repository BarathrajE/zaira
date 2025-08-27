/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
} from "../../actiontype";

const initialAddCartState = {
  loading: false,
  cartItem: null, // newly added cart item
  error: null,
};

export const addCartReducer = (state = initialAddCartState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItem: action.payload };
    case ADD_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

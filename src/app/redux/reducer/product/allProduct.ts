/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ALL_PRODUCT_GET_FAILURE,
  ALL_PRODUCT_GET_REQUEST,
  ALL_PRODUCT_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  product: null, // stores single product details
  error: null,
};

export const allProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ALL_PRODUCT_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case ALL_PRODUCT_GET_SUCCESS:
      return { ...state, loading: false, product: action.payload, error: null };
    case ALL_PRODUCT_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

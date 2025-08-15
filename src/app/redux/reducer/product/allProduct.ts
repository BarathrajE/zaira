/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ALL_PRODUCT_GET_FAILURE,
  ALL_PRODUCT_GET_REQUEST,
  ALL_PRODUCT_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  allProducts: [], 
  error: null,
};

export const allProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ALL_PRODUCT_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case ALL_PRODUCT_GET_SUCCESS:
      return { ...state, loading: false, allProducts: action.payload };
    case ALL_PRODUCT_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

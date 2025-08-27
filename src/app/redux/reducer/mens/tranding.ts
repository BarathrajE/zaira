/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_TRENDING_PRODUCTS_REQUEST,
  GET_TRENDING_PRODUCTS_SUCCESS,
  GET_TRENDING_PRODUCTS_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  trendingProducts: [],
  error: null,
};

export const trendingProductsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TRENDING_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TRENDING_PRODUCTS_SUCCESS:
      
      return { ...state, loading: false, trendingProducts: action.payload };
    case GET_TRENDING_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

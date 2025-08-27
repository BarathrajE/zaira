/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_TRENDING_PRODUCTS_REQUEST,
  GET_TRENDING_PRODUCTS_SUCCESS,
  GET_TRENDING_PRODUCTS_FAILURE,
} from "../../actiontype";
import { getTrendingProducts } from "../../api/mens/tranding";

// Action creators
export const TrendingProductsRequest = () => ({
  type: GET_TRENDING_PRODUCTS_REQUEST,
});

export const TrendingProductsSuccess = (data: any) => ({
  type: GET_TRENDING_PRODUCTS_SUCCESS,
  payload: data,
});

export const TrendingProductsFailure = (error: any) => ({
  type: GET_TRENDING_PRODUCTS_FAILURE,
  payload: error,
});

// Thunk action
export const fetchTrendingProducts = () => {
  return async (dispatch: any) => {
    dispatch(TrendingProductsRequest());
    try {
      const response = await getTrendingProducts();
  

      dispatch(TrendingProductsSuccess(response));
      return response;
    } catch (err: any) {
      dispatch(
        TrendingProductsFailure(
          err.message || "Failed to fetch trending products"
        )
      );
    }
  };
};

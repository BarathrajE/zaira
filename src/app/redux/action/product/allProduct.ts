/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ALL_PRODUCT_GET_FAILURE,
  ALL_PRODUCT_GET_REQUEST,
  ALL_PRODUCT_GET_SUCCESS,
} from "../../actiontype";
import { AllProductGetApi } from "../../api/product/allProduct";

// Action creators
export const AllProductGetRequest = () => ({ type: ALL_PRODUCT_GET_REQUEST });
export const AllProductGetSuccess = (data: any) => ({
  type: ALL_PRODUCT_GET_SUCCESS,
  payload: data,
});
export const AllProductGetFailure = (error: any) => ({
  type: ALL_PRODUCT_GET_FAILURE,
  payload: error,
});

// Thunk for fetching product by ID
export const allProductGetAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch(AllProductGetRequest());
    try {
      const product = await AllProductGetApi(id); // id passed here
      dispatch(AllProductGetSuccess(product));
      return product;
    } catch (err: any) {
      dispatch(
        AllProductGetFailure(err.message || "Failed to fetch product details")
      );
    }
  };
};

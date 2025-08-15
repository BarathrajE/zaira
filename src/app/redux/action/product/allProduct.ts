/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ALL_PRODUCT_GET_FAILURE,
  ALL_PRODUCT_GET_REQUEST,
  ALL_PRODUCT_GET_SUCCESS,
} from "../../actiontype";
import { AllProductGetApi } from "../../api/product/allProduct";

export const AllProductGetRequest = () => ({ type: ALL_PRODUCT_GET_REQUEST });
export const AllProductGetSuccess = (data: any) => ({
  type: ALL_PRODUCT_GET_SUCCESS,
  payload: data,
});
export const AllProductGetFailure = (error: any) => ({
  type: ALL_PRODUCT_GET_FAILURE,
  payload: error,
});

// Step 1: Get All Products
export const allProductGetAction = () => {
  return async (dispatch: any) => {
    dispatch(AllProductGetRequest());
    try {
      const products = await AllProductGetApi();
      dispatch(AllProductGetSuccess(products)); // No .data here
      return products;
    } catch (err: any) {
      dispatch(
        AllProductGetFailure(err.message || "Failed to fetch all products")
      );
    }
  };
};


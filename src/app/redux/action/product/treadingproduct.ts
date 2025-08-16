/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TRADING_PRODUCT_GET_FAILURE,
  TRADING_PRODUCT_GET_REQUEST,
  TRADING_PRODUCT_GET_SUCCESS,
} from "../../actiontype";
import { TradingProductGetApi } from "../../api/product/treadingproduct";


// Action creators
export const TradingProductGetRequest = () => ({
  type: TRADING_PRODUCT_GET_REQUEST,
});

export const TradingProductGetSuccess = (data: any) => ({
  type: TRADING_PRODUCT_GET_SUCCESS,
  payload: data,
});

export const TradingProductGetFailure = (error: any) => ({
  type: TRADING_PRODUCT_GET_FAILURE,
  payload: error,
});

// Step 1: Get Trading Products
export const tradingProductGetAction = () => {
  return async (dispatch: any) => {
    dispatch(TradingProductGetRequest());
    try {
      const products = await TradingProductGetApi();
      dispatch(TradingProductGetSuccess(products)); 
      return products;
    } catch (err: any) {
      dispatch(
        TradingProductGetFailure(
          err.message || "Failed to fetch trading products"
        )
      );
    }
  };
};

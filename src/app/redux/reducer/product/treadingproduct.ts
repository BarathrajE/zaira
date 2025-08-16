/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TRADING_PRODUCT_GET_FAILURE,
  TRADING_PRODUCT_GET_REQUEST,
  TRADING_PRODUCT_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  tradingProducts: [],
  error: null,
};

export const tradingProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TRADING_PRODUCT_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case TRADING_PRODUCT_GET_SUCCESS:
      return { ...state, loading: false, tradingProducts: action.payload };
    case TRADING_PRODUCT_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

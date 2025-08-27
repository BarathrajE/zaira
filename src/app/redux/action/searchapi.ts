/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
} from "../actiontype";
import { SearchProductApi } from "../api/searchapi";

// Search Product Action
export const searchProduct = (query:any) => async (dispatch:any) => {
  dispatch({ type: SEARCH_PRODUCT_REQUEST });
  try {
    const response = await SearchProductApi(query);

    if (response.error) {
      dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: response.message });
    } else {
      dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: response });
    }
  } catch (error:any) {
    dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: error.message });
  }
};

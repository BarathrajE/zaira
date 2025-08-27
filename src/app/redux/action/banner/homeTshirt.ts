/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_HOMETSHIRT_SUCCESS,
  GET_HOMETSHIRT_REQUEST,
  GET_HOMETSHIRT_FAILURE,
} from "../../actiontype";
import { HomeTshite } from "../../api/banner/homeTshirt";

export const HomeTshirtGetRequest = () => ({ type: GET_HOMETSHIRT_REQUEST });
export const HomeTshirtGetSuccess = (data: any) => ({
  type: GET_HOMETSHIRT_SUCCESS,
  payload: data,
});
export const HomeTshirtGetFailure = (error: any) => ({
  type: GET_HOMETSHIRT_FAILURE,
  payload: error,
});

// Step 1: Get Home Tshirt
export const homeTshirtGetAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch(HomeTshirtGetRequest());
    try {
      const response = await HomeTshite(id);
      console.log("API response:", response);
      dispatch(HomeTshirtGetSuccess(response));
      return response;
    } catch (err: any) {
      dispatch(
        HomeTshirtGetFailure(err.message || "Failed to fetch home tshirt")
      );
    }
  };
};

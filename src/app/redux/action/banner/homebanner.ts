/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HOME_BANNER_GET_REQUEST,
  HOME_BANNER_GET_SUCCESS,
  HOME_BANNER_GET_FAILURE,
} from "../../actiontype";
import { BannersGetApi } from "../../api/banner/homebanner";

export const HomeBannerGetRequest = () => ({ type: HOME_BANNER_GET_REQUEST });
export const HomeBannerGetSuccess = (data: any) => ({
  type: HOME_BANNER_GET_SUCCESS,
  payload: data,
});
export const HomeBannerGetFailure = (error: any) => ({
  type: HOME_BANNER_GET_FAILURE,
  payload: error,
});

// Step 1: Get Home Banner
export const homeBannerGetAction = () => {
  return async (dispatch: any) => {
    dispatch(HomeBannerGetRequest());
    try {
      const response = await BannersGetApi();
      console.log("API response:", response); // Log the response
      dispatch(HomeBannerGetSuccess(response)); // ✅ Use response, not response.data
      return response;
    } catch (err: any) {
      dispatch(
        HomeBannerGetFailure(err.message || "Failed to fetch home banner")
      );
    }
  };
};

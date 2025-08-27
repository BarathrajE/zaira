/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BEST_SERVICE_GET_FAILURE,
  BEST_SERVICE_GET_REQUEST,
  BEST_SERVICE_GET_SUCCESS,
} from "../../actiontype";
import { BestServiceGetApi } from "../../api/product/bestservice";

// Action creators
export const BestServiceGetRequest = () => ({
  type: BEST_SERVICE_GET_REQUEST,
});

export const BestServiceGetSuccess = (data: any) => ({
  type: BEST_SERVICE_GET_SUCCESS,
  payload: data,
});

export const BestServiceGetFailure = (error: any) => ({
  type: BEST_SERVICE_GET_FAILURE,
  payload: error,
});

// Step 1: Get Best Services
export const bestServiceGetAction = () => {
  return async (dispatch: any) => {
    dispatch(BestServiceGetRequest());
    try {
      const services = await BestServiceGetApi();
      dispatch(BestServiceGetSuccess(services.data));
      console.log("✅ Best Services fetched successfully:", services.data);
      return services.data;
    } catch (err: any) {
      dispatch(
        BestServiceGetFailure(err.message || "Failed to fetch best services")
      );
    }
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "../../actiontype";
import { createOrderApi } from "../../api/order/createOrder";

export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
export const createOrderSuccess = (data: any) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: data,
});
export const createOrderFailure = (error: any) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const createOrderAction = (userId: string, payload: any) => {
  return async (dispatch: any) => {
    dispatch(createOrderRequest());
    try {
      const response = await createOrderApi(userId, payload);
      dispatch(createOrderSuccess(response));
      return response; // useful for redirecting after success
    } catch (error: any) {
      dispatch(createOrderFailure(error?.response?.data || error.message));
    }
  };
};

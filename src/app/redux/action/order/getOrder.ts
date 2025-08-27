/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from "../../actiontype";
import { getOrdersApi } from "../../api/order/getOrder";

export const getOrdersRequest = () => ({ type: GET_ORDERS_REQUEST });
export const getOrdersSuccess = (data: any) => ({
  type: GET_ORDERS_SUCCESS,
  payload: data,
});
export const getOrdersFailure = (error: any) => ({
  type: GET_ORDERS_FAILURE,
  payload: error,
});

export const getOrdersAction = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(getOrdersRequest());
    try {
      const response = await getOrdersApi(userId);
      dispatch(getOrdersSuccess(response));
      return response; // optional, useful for components
    } catch (error: any) {
      dispatch(getOrdersFailure(error?.response?.data || error.message));
    }
  };
};

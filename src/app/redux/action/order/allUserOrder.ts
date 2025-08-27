/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
} from "../../actiontype";
import { allgetOrdersApi } from "../../api/order/allUserOrder";

export const getAllOrdersRequest = () => ({ type: GET_ALL_ORDERS_REQUEST });
export const getAllOrdersSuccess = (data: any) => ({
  type: GET_ALL_ORDERS_SUCCESS,
  payload: data,
});
export const getAllOrdersFailure = (error: any) => ({
  type: GET_ALL_ORDERS_FAILURE,
  payload: error,
});

export const getAllOrdersAction = () => {
  return async (dispatch: any) => {
    dispatch(getAllOrdersRequest());
    try {
      const response = await allgetOrdersApi(); // no userId
      dispatch(getAllOrdersSuccess(response));
      return response; // optional, useful for components
    } catch (error: any) {
      dispatch(getAllOrdersFailure(error?.response?.data || error.message));
    }
  };
};

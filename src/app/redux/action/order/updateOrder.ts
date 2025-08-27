/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
} from "../../actiontype";
import { updateOrdersApi } from "../../api/order/updateOrder";

export const updateOrderRequest = () => ({ type: UPDATE_ORDER_REQUEST });

export const updateOrderSuccess = (data: any) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: data,
});

export const updateOrderFailure = (error: any) => ({
  type: UPDATE_ORDER_FAILURE,
  payload: error,
});

// Accepts object with orderId and status (string)
export const updateOrderAction = ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  return async (dispatch: any) => {
    console.log("Updating order with ID:", orderId, "and status:", status);
    dispatch(updateOrderRequest());
    try {
      const response = await updateOrdersApi(orderId, status);
      console.log("Update response:", response);
      dispatch(updateOrderSuccess(response.data));
      return response.data;
    } catch (error: any) {
      console.error("Update error:", error);
      dispatch(updateOrderFailure(error?.response?.data || error.message));
    }
  };
};


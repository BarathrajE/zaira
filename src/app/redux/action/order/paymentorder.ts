/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
} from "../../actiontype";
import { verifyPaymentApi } from "../../api/order/paymentorder";

export const verifyPaymentRequest = () => ({ type: VERIFY_PAYMENT_REQUEST });
export const verifyPaymentSuccess = (data: any) => ({
  type: VERIFY_PAYMENT_SUCCESS,
  payload: data,
});
export const verifyPaymentFailure = (error: any) => ({
  type: VERIFY_PAYMENT_FAILURE,
  payload: error,
});

export const verifyPaymentAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(verifyPaymentRequest());
    try {
      const response = await verifyPaymentApi(payload);
      dispatch(verifyPaymentSuccess(response.data));
      return response.data; // return for further processing like navigation
    } catch (error: any) {
      dispatch(verifyPaymentFailure(error?.response?.data || error.message));
    }
  };
};

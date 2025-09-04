/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "@reduxjs/toolkit";
import { apiRequest } from "../../apiRequest";


export const createOrder = (amount: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const data = await apiRequest("/razorpay", "POST", { amount }, false);

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error: any) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error.message || "Failed to create order",
    });
  }
};

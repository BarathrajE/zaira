// store/actions/paymentActions.ts
import { Dispatch } from "@reduxjs/toolkit";

export const createOrder = (amount: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_FAIL", payload: error });
  }
};

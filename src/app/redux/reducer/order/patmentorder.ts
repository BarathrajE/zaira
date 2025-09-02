/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  payment: null,
  error: null,
};

export const verifyPaymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case VERIFY_PAYMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case VERIFY_PAYMENT_SUCCESS:
      return { ...state, loading: false, payment: action.payload };

    case VERIFY_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

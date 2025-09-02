/* eslint-disable @typescript-eslint/no-explicit-any */
// store/reducers/paymentReducer.ts
interface PaymentState {
  loading: boolean;
  order: any;
  error: any;
}

const initialState: PaymentState = {
  loading: false,
  order: null,
  error: null,
};

export const paymentrazorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return { ...state, loading: true };
    case "CREATE_ORDER_SUCCESS":
      return { ...state, loading: false, order: action.payload };
    case "CREATE_ORDER_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

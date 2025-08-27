/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const getOrdersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case GET_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

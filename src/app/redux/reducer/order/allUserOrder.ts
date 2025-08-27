/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const getAllOrdersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case GET_ALL_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

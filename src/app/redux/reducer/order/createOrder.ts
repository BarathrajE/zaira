/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  order: null,
  error: null,
};

export const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

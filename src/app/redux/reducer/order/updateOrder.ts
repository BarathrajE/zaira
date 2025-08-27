/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
} from "../../actiontype";

interface UpdateOrderState {
  loading: boolean;
  updatedOrder: any | null;
  error: string | null;
}

const initialState: UpdateOrderState = {
  loading: false,
  updatedOrder: null,
  error: null,
};

export const updateOrderReducer = (
  state = initialState,
  action: any
): UpdateOrderState => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        updatedOrder: null, // clear previous update
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedOrder: action.payload,
        error: null,
      };

    case UPDATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        updatedOrder: null, // ensure old data is cleared
        error: action.payload,
      };

    default:
      return state;
  }
};

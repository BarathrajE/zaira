/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_SINGLE_USER_ADDRESS_REQUEST,
  GET_SINGLE_USER_ADDRESS_SUCCESS,
  GET_SINGLE_USER_ADDRESS_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  address: null, // Changed to `address` (singular) since it's a single address
  error: null,
};

export const singleUserAddressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SINGLE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SINGLE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload || null, // Store the single address
      };
    case GET_SINGLE_USER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        address: null, // Reset to null if failed
      };
    default:
      return state;
  }
};

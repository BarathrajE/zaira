/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  addresses: [], // ✅ empty array by default
  error: null,
};

export const GETaddressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: Array.isArray(action.payload) ? action.payload : [], // ✅ fallback
      };

    case GET_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        addresses: [], // ✅ reset to empty if failed
      };

    default:
      return state;
  }
};

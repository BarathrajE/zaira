/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
} from "../../actiontype";

interface AddressState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: AddressState = {
  loading: false,
  data: null,
  error: null,
};

const addressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ADDRESS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CREATE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addressReducer;

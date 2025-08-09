/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actiontype";

const initialState = {
  login: {
    loading: false,
    data: null,
    error: null,
  },
};

export const LoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: { loading: true, data: null, error: null },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        login: { loading: false, data: action.payload, error: null },
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        login: { loading: false, data: null, error: action.payload },
      };

    default:
      return state;
  }
};

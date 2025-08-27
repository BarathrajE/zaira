/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BEST_SERVICE_GET_FAILURE,
  BEST_SERVICE_GET_REQUEST,
  BEST_SERVICE_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  bestServices: [],
  error: null,
};

export const bestServiceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case BEST_SERVICE_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case BEST_SERVICE_GET_SUCCESS:
      return { ...state, loading: false, bestServices: action.payload };
     
    case BEST_SERVICE_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

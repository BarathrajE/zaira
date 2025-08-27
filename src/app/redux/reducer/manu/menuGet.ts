/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MENU_GET_FAILURE,
  MENU_GET_REQUEST,
  MENU_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  menu: [],
  error: null,
};

export const menuReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MENU_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case MENU_GET_SUCCESS:

      return { ...state, loading: false, menu: action.payload };
    case MENU_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

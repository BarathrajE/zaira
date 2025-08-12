/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SUBMENU_GET_FAILURE,
  SUBMENU_GET_REQUEST,
  SUBMENU_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  submenu: [],
  error: null,
};

export const submenuReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUBMENU_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case SUBMENU_GET_SUCCESS:
      return { ...state, loading: false, submenu: action.payload };
    case SUBMENU_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FETCH_SUBMENUS_REQUEST,
  FETCH_SUBMENUS_SUCCESS,
  FETCH_SUBMENUS_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  submenus: [],
  error: null,
};

export const collectionMenuReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_SUBMENUS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUBMENUS_SUCCESS:
      return { ...state, loading: false, submenus: action.payload };
    case FETCH_SUBMENUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

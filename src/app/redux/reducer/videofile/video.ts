/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VIDEO_GET_FAILURE,
  VIDEO_GET_REQUEST,
  VIDEO_GET_SUCCESS,
} from "../../actiontype";

const initialState = {
  loading: false,
  videos: [],
  error: null,
};

export const videoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case VIDEO_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case VIDEO_GET_SUCCESS:
      return { ...state, loading: false, videos: action.payload };
    case VIDEO_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_GALLERY_REQUEST,
  GET_GALLERY_SUCCESS,
  GET_GALLERY_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  gallery: [], // changed from trendingProducts to gallery
  error: null,
};

export const galleryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_GALLERY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_GALLERY_SUCCESS:
      return { ...state, loading: false, gallery: action.payload };
    case GET_GALLERY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

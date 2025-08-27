/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_GALLERY_REQUEST,
  GET_GALLERY_SUCCESS,
  GET_GALLERY_FAILURE,
} from "../../actiontype";
import { getGallery } from "../../api/mens/gallery";


// Action creators
export const GalleryRequest = () => ({
  type: GET_GALLERY_REQUEST,
});

export const GallerySuccess = (data: any) => ({
  type: GET_GALLERY_SUCCESS,
  payload: data,
});

export const GalleryFailure = (error: any) => ({
  type: GET_GALLERY_FAILURE,
  payload: error,
});

// Thunk action
export const fetchGallery = () => {
  return async (dispatch: any) => {
    dispatch(GalleryRequest());
    try {
      const response = await getGallery(); // call updated API
      dispatch(GallerySuccess(response));
      return response;
    } catch (err: any) {
      dispatch(
        GalleryFailure(err.message || "Failed to fetch gallery data")
      );
    }
  };
};

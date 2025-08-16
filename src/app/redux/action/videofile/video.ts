/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  VIDEO_GET_SUCCESS,
  VIDEO_GET_FAILURE,
  VIDEO_GET_REQUEST,
} from "../../actiontype";
import { VideoGetApi } from "../../api/videofile/video";

// Action creators
export const VideoGetRequest = () => ({
  type: VIDEO_GET_REQUEST,
});

export const VideoGetSuccess = (data: any) => ({
  type: VIDEO_GET_SUCCESS,
  payload: data,
});

export const VideoGetFailure = (error: any) => ({
  type: VIDEO_GET_FAILURE,
  payload: error,
});

// Step 1: Get Videos
export const videoGetAction = () => {
  return async (dispatch: any) => {
    dispatch(VideoGetRequest());
    try {
      const videos = await VideoGetApi();
      dispatch(VideoGetSuccess(videos));
      return videos;
    } catch (err: any) {
      dispatch(VideoGetFailure(err.message || "Failed to fetch videos"));
    }
  };
};

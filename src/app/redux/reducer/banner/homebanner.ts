/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HOME_BANNER_GET_REQUEST,
  HOME_BANNER_GET_SUCCESS,
  HOME_BANNER_GET_FAILURE,
} from "../../actiontype";

const initialState = {
  loading: false,
  homeBanner: [], // ✅ always start with an empty array
  error: null,
};

export const bannerreducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HOME_BANNER_GET_REQUEST:
      return { ...state, loading: true };
    case HOME_BANNER_GET_SUCCESS:
      console.log("Reducer payload:", action.payload); // Log the payload
      return {
        ...state,
        loading: false,
        homeBanner: action.payload, // ✅ This will now be the array of banners
      };
    case HOME_BANNER_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


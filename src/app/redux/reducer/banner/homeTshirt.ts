/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_HOMETSHIRT_REQUEST,
  GET_HOMETSHIRT_SUCCESS,
  GET_HOMETSHIRT_FAILURE,
} from "../../actiontype";

const initialTshirtState = {
  loading: false,
  homeTshirt: [], // Start with an empty array
  error: null,
};

export const homeTshirtReducer = (state = initialTshirtState, action: any) => {
  switch (action.type) {
    case GET_HOMETSHIRT_REQUEST:
      return { ...state, loading: true };
    case GET_HOMETSHIRT_SUCCESS:
      console.log("HomeTshirt Reducer payload:", action.payload);
      return {
        ...state,
        loading: false,
        homeTshirt: action.payload,
      };
    case GET_HOMETSHIRT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

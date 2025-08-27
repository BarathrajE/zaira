/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  SEARCH_PRODUCT_REQUEST, 
  SEARCH_PRODUCT_SUCCESS, 
  SEARCH_PRODUCT_FAILURE 
} from "../actiontype";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const searchReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case SEARCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

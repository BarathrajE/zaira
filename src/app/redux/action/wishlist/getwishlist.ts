/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_WISHLIST_FAILURE,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
} from "../../actiontype";
import { getWishlistApi } from "../../api/wishlist/getwishlist";

// --- GET Wishlist ---
export const GetWishlistRequest = () => ({ type: GET_WISHLIST_REQUEST });
export const GetWishlistSuccess = (data: any) => ({
  type: GET_WISHLIST_SUCCESS,
  payload: data,
});
export const GetWishlistFailure = (error: any) => ({
  type: GET_WISHLIST_FAILURE,
  payload: error,
});

export const getWishlistAction = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(GetWishlistRequest());
    try {
      const res = await getWishlistApi(userId);
      dispatch(GetWishlistSuccess(res.data || res));
      return res;
    } catch (err: any) {
      const is404 = err.message?.includes("404") || err?.response?.status === 404;
      const isWishlistEmpty = err.message?.includes("Wishlist is empty");
      
      if (is404 || isWishlistEmpty) {
        // Treat empty wishlist as success with empty array
        dispatch(GetWishlistSuccess([]));
        return { data: [], message: 'Wishlist is empty' };
      } else {
        dispatch(GetWishlistFailure(err.message || "Failed to fetch wishlist"));
        throw err; // Re-throw for other components to handle
      }
    }
  };
};
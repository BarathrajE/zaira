/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REMOVE_WISHLIST_FAILURE,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
} from "../../actiontype";
import { removeWishlistApi } from "../../api/wishlist/deletewishlist";

export const RemoveWishlistRequest = () => ({ type: REMOVE_WISHLIST_REQUEST });
export const RemoveWishlistSuccess = (data: any) => ({
  type: REMOVE_WISHLIST_SUCCESS,
  payload: data,
});
export const RemoveWishlistFailure = (error: any) => ({
  type: REMOVE_WISHLIST_FAILURE,
  payload: error,
});

export const removeWishlistAction = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch(RemoveWishlistRequest());
    try {
      const res = await removeWishlistApi(userId, productId);
      dispatch(RemoveWishlistSuccess(res));
      return res;
    } catch (err: any) {
      dispatch(
        RemoveWishlistFailure(err.message || "Failed to remove from wishlist")
      );
    }
  };
};

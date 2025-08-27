/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_WISHLIST_FAILURE, ADD_WISHLIST_REQUEST, ADD_WISHLIST_SUCCESS } from "../../actiontype";
import { addWishlistApi } from "../../api/wishlist/addwishlist";

// --- ADD to Wishlist ---
export const AddWishlistRequest = () => ({ type: ADD_WISHLIST_REQUEST });
export const AddWishlistSuccess = (data: any) => ({ type: ADD_WISHLIST_SUCCESS, payload: data });
export const AddWishlistFailure = (error: any) => ({ type: ADD_WISHLIST_FAILURE, payload: error });

export const addWishlistAction = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch(AddWishlistRequest());
    try {
      const res = await addWishlistApi(userId, productId);
      dispatch(AddWishlistSuccess(res));
      return res;
    } catch (err: any) {
      dispatch(AddWishlistFailure(err.message || "Failed to add to wishlist"));
    }
  };
};
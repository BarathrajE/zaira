/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
} from "../../actiontype";
import { updateCartApi } from "../../api/cart/putcart";


// --- Update Cart ---
export const UpdateCartRequest = () => ({
  type: UPDATE_CART_REQUEST,
});

export const UpdateCartSuccess = (data: any) => ({
  type: UPDATE_CART_SUCCESS,
  payload: data,
});

export const UpdateCartFailure = (error: any) => ({
  type: UPDATE_CART_FAILURE,
  payload: error,
});

// --- Thunk action ---
export const updateCartAction = (
  userId: string,
  items: { productId: string; quantity: number }[]
) => {
  return async (dispatch: any) => {
    dispatch(UpdateCartRequest());
    try {
      const res = await updateCartApi(userId, items);
      dispatch(UpdateCartSuccess(res));
      return res;
    } catch (err: any) {
      dispatch(
        UpdateCartFailure(err.message || "Failed to update cart")
      );
    }
  };
};

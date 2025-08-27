/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_FAILURE,
} from "../../actiontype";
import { deleteCart } from "../../api/cart/deletetoCart";

// --- Delete from Cart ---
export const DeleteFromCartRequest = () => ({
  type: DELETE_FROM_CART_REQUEST,
});

export const DeleteFromCartSuccess = (data: any) => ({
  type: DELETE_FROM_CART_SUCCESS,
  payload: data,
});

export const DeleteFromCartFailure = (error: any) => ({
  type: DELETE_FROM_CART_FAILURE,
  payload: error,
});

// --- Thunk action ---
export const deleteFromCartAction = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch(DeleteFromCartRequest());
    try {
      const res = await deleteCart(userId, productId);
      dispatch(DeleteFromCartSuccess(res));
      return res;
    } catch (err: any) {
      dispatch(
        DeleteFromCartFailure(err.message || "Failed to delete from cart")
      );
    }
  };
};

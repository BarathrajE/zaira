/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_REQUEST,
} from "../../actiontype";
import { addCart } from "../../api/cart/addCart";

export const AddCartRequest = () => ({ type: ADD_TO_CART_REQUEST });
export const AddCartSuccess = (data: any) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: data,
});
export const AddCartFailure = (error: any) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

export const addToCart = (userId: string, items: { productId: any; quantity: number }[]) => {
  return async (dispatch: any) => {
    dispatch(AddCartRequest());
    try {
      const response = await addCart(userId, items); // items is already an array
      dispatch(AddCartSuccess(response));
      return response;
    } catch (err: any) {
      dispatch(AddCartFailure(err.message || "Failed to add item to cart"));
      throw err;
    }
  };
};


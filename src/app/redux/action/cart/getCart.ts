/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
} from "../../actiontype";
import { getCart } from "../../api/cart/getCart";

export const GetCartRequest = () => ({ type: GET_CART_REQUEST });
export const GetCartSuccess = (data: any) => ({
  type: GET_CART_SUCCESS,
  payload: data,
});
export const GetCartFailure = (error: any) => ({
  type: GET_CART_FAILURE,
  payload: error,
});

export const fetchCart = (userId: any) => {
  return async (dispatch: any) => {
    dispatch(GetCartRequest());
    try {
      const response = await getCart(userId);

      const cartData = response.items ? response : { items: [], totalPrice: 0 };


      dispatch(GetCartSuccess(cartData));
      return cartData;
    } catch (err: any) {
      dispatch(GetCartFailure(err.message || "Failed to fetch cart"));
    }
  };
};

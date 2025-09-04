/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_SINGLE_USER_ADDRESS_REQUEST,
  GET_SINGLE_USER_ADDRESS_SUCCESS,
  GET_SINGLE_USER_ADDRESS_FAILURE,
} from "../../actiontype";
import { singleUserAddress } from "../../api/profile/singleAddressGet";


export const getSingleUserAddressRequest = () => ({
  type: GET_SINGLE_USER_ADDRESS_REQUEST,
});

export const getSingleUserAddressSuccess = (data: any) => ({
  type: GET_SINGLE_USER_ADDRESS_SUCCESS,
  payload: data,
});

export const getSingleUserAddressFailure = (error: any) => ({
  type: GET_SINGLE_USER_ADDRESS_FAILURE,
  payload: error,
});

// Thunk Action
export const getSingleUserAddressAction = ( addressid: string) => {
  return async (dispatch: any) => {
    dispatch(getSingleUserAddressRequest());
    try {
      const res = await singleUserAddress( addressid);
      dispatch(getSingleUserAddressSuccess(res)); // if API returns {data: []}, use res.data
      return res;
    } catch (err: any) {
      dispatch(getSingleUserAddressFailure(err.message || "Failed to fetch address"));
    }
  };
};

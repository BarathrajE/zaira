/* eslint-disable @typescript-eslint/no-explicit-any */ 

import {
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
} from "../../actiontype";
import { updateAddressApi } from "../../api/profile/addressPut"; // your PUT API helper

// Action creators
export const UpdateAddressRequest = () => ({
  type: UPDATE_ADDRESS_REQUEST,
});

export const UpdateAddressSuccess = (data: any) => ({
  type: UPDATE_ADDRESS_SUCCESS,
  payload: data,
});

export const UpdateAddressFailure = (error: any) => ({
  type: UPDATE_ADDRESS_FAILURE,
  payload: error,
});

// Thunk Action
export const updateAddressAction = (id: string, addressData: any) => {
  return async (dispatch: any) => {
    dispatch(UpdateAddressRequest());
    try {
      const res = await updateAddressApi(id, addressData);
      dispatch(UpdateAddressSuccess(res)); // if API returns {data: ...}, you might use res.data
      return res;
    } catch (err: any) {
      dispatch(UpdateAddressFailure(err.message || "Failed to update address"));
      throw err; // optional, in case you want to handle in component
    }
  };
};

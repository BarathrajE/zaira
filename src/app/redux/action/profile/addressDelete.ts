/* eslint-disable @typescript-eslint/no-explicit-any */ 

import {
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "../../actiontype";
import { deleteAddressApi } from "../../api/profile/addressDelete"; // your DELETE API helper

// Action creators
export const DeleteAddressRequest = () => ({
  type: DELETE_ADDRESS_REQUEST,
});

export const DeleteAddressSuccess = (data: any) => ({
  type: DELETE_ADDRESS_SUCCESS,
  payload: data,
});

export const DeleteAddressFailure = (error: any) => ({
  type: DELETE_ADDRESS_FAILURE,
  payload: error,
});

// Thunk Action
export const deleteAddressAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch(DeleteAddressRequest());
    try {
      await deleteAddressApi(id); // no need to wait for body
      dispatch(DeleteAddressSuccess({ id })); // manually send id to reducer
    } catch (err: any) {
      dispatch(DeleteAddressFailure(err.message || "Failed to delete address"));
      throw err;
    }
  };
};


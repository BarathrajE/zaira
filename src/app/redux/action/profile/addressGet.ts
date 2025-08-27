/* eslint-disable @typescript-eslint/no-explicit-any */ 

import {
  GET_ADDRESSES_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
} from "../../actiontype";
import { getAddressesApi } from "../../api/profile/addressGet";

export const GetAddressesRequest = () => ({
  type: GET_ADDRESSES_REQUEST,
});

export const GetAddressesSuccess = (data: any) => ({
  type: GET_ADDRESSES_SUCCESS,
  payload: data,
});

export const GetAddressesFailure = (error: any) => ({
  type: GET_ADDRESSES_FAILURE,
  payload: error,
});

// Thunk Action
export const getAddressesAction = (Id: string) => {
  return async (dispatch: any) => {
    dispatch(GetAddressesRequest());
    try {
      const res = await getAddressesApi(Id );
      dispatch(GetAddressesSuccess(res)); // if API returns {data: []}, use res.data
      return res;
    } catch (err: any) {
      dispatch(GetAddressesFailure(err.message || "Failed to fetch addresses"));
    }
  };
};

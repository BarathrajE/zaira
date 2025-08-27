/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
} from "../../actiontype";
import { CreateAddressApi } from "../../api/profile/address";

// Action creators
export const CreateAddressRequest = () => ({
  type: CREATE_ADDRESS_REQUEST,
});

export const CreateAddressSuccess = (data: any) => ({
  type: CREATE_ADDRESS_SUCCESS,
  payload: data,
});

export const CreateAddressFailure = (error: any) => ({
  type: CREATE_ADDRESS_FAILURE,
  payload: error,
});

// Thunk: Post Address
export const createAddressAction = (userId: string, addressData: any) => {
  return async (dispatch: any) => {
    dispatch(CreateAddressRequest());
    try {
      const response = await CreateAddressApi(userId, addressData);
      dispatch(CreateAddressSuccess(response));
      return response; 
    } catch (err: any) {
      dispatch(CreateAddressFailure(err.message || "Failed to create address"));
      throw err; // ✅ component can catch error
    }
  };
};

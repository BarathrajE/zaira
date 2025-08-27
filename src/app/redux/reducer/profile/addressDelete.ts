/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "../../actiontype";
import { Reducer } from "redux";

interface Address {
  _id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface State {
  loading: boolean;
  addresses: Address[];
  error: string | null;
}

const initialState: State = {
  loading: false,
  addresses: [],
  error: null,
};

export const deleteAddressReducer: Reducer<State> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case DELETE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };

   case DELETE_ADDRESS_SUCCESS:
  return {
    ...state,
    loading: false,
    addresses: state.addresses.filter(
      (addr) => addr._id !== action.payload.id // match MongoDB _id
    ),
  };

    case DELETE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

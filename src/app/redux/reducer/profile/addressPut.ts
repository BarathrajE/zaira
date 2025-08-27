/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
} from "../../actiontype";
import { Reducer } from "redux";

// ✅ Add id to Address
interface Address {
  id: string; // <- required for update logic
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  // add other fields based on your API
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

export const updateAddressReducer: Reducer<State> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };

    case UPDATE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

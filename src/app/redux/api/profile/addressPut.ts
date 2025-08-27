/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

// PUT API to update an address
export const updateAddressApi = async (id: string, addressData: any) => {
  return await apiRequest(`/address/${id}`, "PUT", addressData, true, true);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

// DELETE API to remove an address
export const deleteAddressApi = async (id: string) => {
  return await apiRequest(`/address/${id}`, "DELETE", null, true, true);
};
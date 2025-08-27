import { apiRequest } from "../../apiRequest";

export const getAddressesApi = async (Id: string) => {
  return await apiRequest(`/address/${Id}`, "GET", null, true, true);
};

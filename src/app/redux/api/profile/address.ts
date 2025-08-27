import { apiRequest } from "../../apiRequest";

export const CreateAddressApi = async (
  userId: string,
  address: {
    name: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    secondary_phone?: string;
    phone: string;
  }
) => {
  return await apiRequest(`/address/${userId}`, "POST", address, true, true);
};

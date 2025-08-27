import { apiRequest } from "../../apiRequest";

export const getCart = async (userId: string) => {
  return await apiRequest(`/cart/${userId}`, "GET", null, true, true);
};

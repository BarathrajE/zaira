import { apiRequest } from "../../apiRequest";

export const deleteCart = async (userId: string, productId: string) => {
  return await apiRequest(`/cart/${userId}/${productId}`, "DELETE", null, true, true);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

export const addCart = async (
  userId: string,
  items: { productId: any; quantity: number }[]
) => {
  return await apiRequest(`/cart/${userId}`, "POST", { items }, true, true);
};

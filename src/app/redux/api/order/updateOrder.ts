/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

export const updateOrdersApi = async (orderId: string, status: string) => {
  return await apiRequest(`/order/${orderId}`, "PUT", { status }, true, true);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

export const getOrdersApi = async (userId: string) => {
  return await apiRequest(
    `/order/user/${userId}`, 
    "GET", 
    null, 
    true, 
    true 
  );
};

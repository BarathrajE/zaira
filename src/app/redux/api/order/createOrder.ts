/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

export const createOrderApi = async (
  userId: string,
  payload: {
    products: any[];
    address: string;
    paymentMethod: string;
    totalAmount: number;
    status?: string;
    designPrint?: boolean;
    designId?: string | null;
    Size?: string;
  }
) => {
  return await apiRequest(
    `/order/create/${userId}`,
    "POST",
    payload,
    true,
    true
  );
};

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
  }
) => {
  return await apiRequest(
    `/order/create/${userId}`, // Corrected endpoint
    "POST",                    // Correct method
    payload,                   // Sending order payload
    true,
    true
  );
};

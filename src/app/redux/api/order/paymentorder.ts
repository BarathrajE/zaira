/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../../apiRequest";

export const verifyPaymentApi = async (payload: any) => {
  return await apiRequest(
    "/payment/verify-payment", // API endpoint
    "POST",                    // HTTP Method
    payload,                   // Request body
    true,                      // Requires Auth
    true                       // Show Loader
  );
};

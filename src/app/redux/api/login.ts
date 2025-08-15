import { apiRequest } from "../apiRequest";

// Step 1: Send OTP to phone
export const SendOtpApi = async (phone: string) => {
  return await apiRequest("/auth/send", "POST", { phone },true, true);
};

// Step 2: Verify OTP and login
export const VerifyOtpApi = async (phone: string, code: string) => {
  return await apiRequest("/auth/verify", "POST", { phone, code }, true);
};

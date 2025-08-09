import { apiRequest } from "../apiRequest";

// Step 1: Send OTP to phone
export const SendOtpApi = async (phone: string) => {
  console.log(SendOtpApi, "lkjdakasjdkadnadska");
  return await apiRequest("send", "POST", { phone }, true);
};

// Step 2: Verify OTP and login
export const VerifyOtpApi = async (phone: string, code: string) => {
  return await apiRequest("/verifyp", "POST", { phone, code }, true);
};

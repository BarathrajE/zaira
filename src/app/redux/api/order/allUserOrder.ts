import { apiRequest } from "../../apiRequest";

export const allgetOrdersApi = async () => {
  return await apiRequest(
    `/order/`, 
    "GET", 
    null, 
    true, 
    true 
  );
};

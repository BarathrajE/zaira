import { apiRequest } from "../../apiRequest";

export const HomeTshite = async (id: string) => {
  return await apiRequest(`/product/mainpage/${id}`, "GET", null, true, true);
};

import { apiRequest } from "../../apiRequest";

export const getTrendingProducts = async () => {
  return await apiRequest(`/product/trending/by-menu`, "GET", null, true, true);
};

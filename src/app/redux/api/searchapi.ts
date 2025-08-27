import { apiRequest } from "../apiRequest";

// Step 3: Search Product API (GET)
export const SearchProductApi = async (query: string) => {
  return await apiRequest(`/product/search?query=${encodeURIComponent(query)}`, "GET");
};

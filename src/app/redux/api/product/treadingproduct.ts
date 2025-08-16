import { apiRequest } from "../../apiRequest";

export const TradingProductGetApi = async () => {
  return await apiRequest("/product/trending", "GET", null,true, true);
};
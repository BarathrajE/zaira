import { apiRequest } from "../../apiRequest";

export const AllProductGetApi = async () => {
  return await apiRequest("/product/", "GET", null,true, true);
};
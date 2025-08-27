import { apiRequest } from "../../apiRequest";

export const AllProductGetApi = async (id:string) => {
  return await apiRequest(`/product/${id}`, "GET", null,true, true);
};
import { apiRequest } from "../../apiRequest";

export const MenuGetApi = async () => {
  return await apiRequest("/menu/", "GET", null,true, true);
};
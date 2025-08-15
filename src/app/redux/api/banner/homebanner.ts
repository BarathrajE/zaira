import { apiRequest } from "../../apiRequest";

export const BannersGetApi = async () => {
  return await apiRequest("/banners/", "GET", null,true, true);
};
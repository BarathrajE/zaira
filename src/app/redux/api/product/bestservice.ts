import { apiRequest } from "../../apiRequest";

export const BestServiceGetApi = async () => {
  return await apiRequest("/bestservice/", "GET", null,true, true);
};
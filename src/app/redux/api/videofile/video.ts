import { apiRequest } from "../../apiRequest";

export const VideoGetApi = async () => {
  return await apiRequest("/video/", "GET", null,true, true);
};
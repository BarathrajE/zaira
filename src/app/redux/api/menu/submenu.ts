import { apiRequest } from "../../apiRequest";

export const SubMenuGetApi = async () => {
  return await apiRequest("/submenus/", "GET", null, true);
};

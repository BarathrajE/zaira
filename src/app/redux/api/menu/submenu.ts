import { apiRequest } from "../../apiRequest";

export const SubMenuGetApi = async () => {
  return await apiRequest("/menu/submenus", "GET", null,true, true);
};

import { apiRequest } from "../../apiRequest";

export const collectionMenuGetApi = async (menuId: string) => {
  return await apiRequest(
    `/menu/${menuId}/submenus`, // endpoint
    "GET",
    null,
    true, // authRequired?
    true  // isJson?
  );
};
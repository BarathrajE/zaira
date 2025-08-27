import { apiRequest } from "../../apiRequest";

export const collectionMenuGetApi = async (submenuId: string) => {
  return await apiRequest(
    `/product/submenu/${submenuId}`, // Matches backend route
    
    "GET",
    null,
    true,
    true
  );
  
};

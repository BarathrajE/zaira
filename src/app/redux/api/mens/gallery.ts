import { apiRequest } from "../../apiRequest";

export const getGallery = async () => {
  return await apiRequest(`/gallery/`, "GET", null, true, true);
};

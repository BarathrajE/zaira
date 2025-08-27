import { apiRequest } from "../../apiRequest";

export const getWishlistApi = async (userId: string) => {
  return await apiRequest(
    `/wishlist/${userId}`,
    "GET",
    null,
    true,
    true
  );
};

import { apiRequest } from "../../apiRequest";

export const addWishlistApi = async (userId: string, productId: string) => {
  return await apiRequest(
    `/wishlist/${userId}/${productId}`,
    "POST",
    null,
    true,
    true
  );
};

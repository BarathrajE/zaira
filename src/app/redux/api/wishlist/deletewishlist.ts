import { apiRequest } from "../../apiRequest";

export const removeWishlistApi = async (userId: string, productId: string) => {
  return await apiRequest(
    `/wishlist/${userId}/${productId}`,
    "DELETE",
    null,
    true,
    true
  );
};

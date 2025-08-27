import { apiRequest } from "../../apiRequest";

// Update cart items
export const updateCartApi = async (
  userId: string,
  items: { productId: string; quantity: number }[]
) => {
  // The backend expects: { items: [...] }
  return await apiRequest(`/cart/${userId}`, "PUT", { items }, true, true);
};

import { apiRequest } from "../../apiRequest";

export const singleUserAddress = async ( addressid: string) => {
  return await apiRequest(
    `/address/id/${addressid}`,
    "GET",
    null,
    true,
    true
  );
};

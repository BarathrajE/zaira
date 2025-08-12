/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MENU_GET_FAILURE,
  MENU_GET_REQUEST,
  MENU_GET_SUCCESS,
} from "../../actiontype";
import { MenuGetApi } from "../../api/menu/menuGet";
export const MenuGetRequest = () => ({ type: MENU_GET_REQUEST });
export const MenuGetSuccess = (data: any) => ({
  type: MENU_GET_SUCCESS,
  payload: data,
});
export const MenuGetFailure = (error: any) => ({
  type: MENU_GET_FAILURE,
  payload: error,
});

// Step 1: Get Menu
export const menuGetAction = () => {
  return async (dispatch: any) => {
    dispatch(MenuGetRequest());
    try {
      const response = await MenuGetApi();
      dispatch(MenuGetSuccess(response.data));
      console.log(response,"jhjhgshj");
      return response;
    } catch (err: any) {
      dispatch(MenuGetFailure(err.message || "Failed to fetch menu"));
    }
  };
};

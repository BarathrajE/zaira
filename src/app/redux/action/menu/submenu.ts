/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SUBMENU_GET_FAILURE,
  SUBMENU_GET_REQUEST,
  SUBMENU_GET_SUCCESS,
} from "../../actiontype";
import { SubMenuGetApi } from "../../api/menu/submenu";


// Action creators
export const SubMenuGetRequest = () => ({ type: SUBMENU_GET_REQUEST });
export const SubMenuGetSuccess = (data: any) => ({
  type: SUBMENU_GET_SUCCESS,
  payload: data,
});
export const SubMenuGetFailure = (error: any) => ({
  type: SUBMENU_GET_FAILURE,
  payload: error,
});

// Step 1: Get Submenu
export const submenuGetAction = () => {
  return async (dispatch: any) => {
    dispatch(SubMenuGetRequest());
    try {
      const response = await SubMenuGetApi();
      dispatch(SubMenuGetSuccess(response.data));
      console.log(response, "Fetched Submenu Data");
      return response.data;
    } catch (err: any) {
      dispatch(SubMenuGetFailure(err.message || "Failed to fetch submenu"));
    }
  };
};

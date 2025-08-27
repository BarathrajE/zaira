/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FETCH_SUBMENUS_REQUEST,
  FETCH_SUBMENUS_SUCCESS,
  FETCH_SUBMENUS_FAILURE,
} from "../../actiontype";
import { collectionMenuGetApi } from "../../api/menu/collectionapi";


export const fetchSubmenusRequest = () => ({ type: FETCH_SUBMENUS_REQUEST });
export const fetchSubmenusSuccess = (data: any) => ({
  type: FETCH_SUBMENUS_SUCCESS,
  payload: data,
});
export const fetchSubmenusFailure = (error: any) => ({
  type: FETCH_SUBMENUS_FAILURE,
  payload: error,
});

// Thunk action
export const fetchSubmenusAction = (submenuId: string) => {
  return async (dispatch: any) => {
    dispatch(fetchSubmenusRequest());
    try {
      const response = await collectionMenuGetApi(submenuId);
      dispatch(fetchSubmenusSuccess(response));
      return response;
    } catch (err: any) {
      dispatch(fetchSubmenusFailure(err.message || "Failed to fetch submenus"));
    }
  };
};

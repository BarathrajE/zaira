/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actiontype";
import { SendOtpApi, VerifyOtpApi } from "../api/login";
import Cookies from "js-cookie";

// Action creators
export const LoginRequest = () => ({ type: LOGIN_REQUEST });
export const LoginSuccess = (data: any) => ({ type: LOGIN_SUCCESS, payload: data });
export const LoginFailure = (error: any) => ({ type: LOGIN_FAILURE, payload: error });

// Step 1: Send OTP
export const sendOtpAction = (phone: string) => {
  return async (dispatch: any) => {
    dispatch(LoginRequest());
    try {
      const response = await SendOtpApi(phone);
      dispatch(LoginSuccess({ otpSent: true, ...response }));
    } catch (err: any) {
      dispatch(LoginFailure(err.message || "Failed to send OTP"));
    }
  };
};

// Step 2: Verify OTP & Login
export const verifyOtpAction = (phone: string, code: string) => {
  return async (dispatch: any) => {
    dispatch(LoginRequest());
    try {
      const response = await VerifyOtpApi(phone, code);

      // Save token if provided
      if (response?.accessToken) {
        Cookies.set("accessToken", response.accessToken, { expires: 7 });
      }

      dispatch(LoginSuccess(response));
    } catch (err: any) {
      dispatch(LoginFailure(err.message || "OTP verification failed"));
    }
  };
};

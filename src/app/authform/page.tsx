/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { KeyRound } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

export default function OTPLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ phone?: string; otp?: string }>({});
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      if (errors.phone) {
        setErrors({ ...errors, phone: "" });
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errors.otp) {
      setErrors({ ...errors, otp: "" });
    }
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrors({ phone: "Please enter a valid 10-digit mobile number" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsOtpSent(true);
      setTimer(60);
      setCanResend(false);
      console.log(`OTP sent to +91${phoneNumber}`);
    } catch (error) {
      setErrors({ phone: "Failed to send OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter complete 6-digit OTP" });
      return;
    }
    setIsVerifying(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("OTP verified successfully!");
      alert("Login successful!");
      setPhoneNumber("");
      setOtp(["", "", "", "", "", ""]);
      setIsOtpSent(false);
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      setErrors({ otp: "Invalid OTP. Please try again." });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setOtp(["", "", "", "", "", ""]);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimer(60);
      setCanResend(false);
      console.log(`OTP resent to +91${phoneNumber}`);
    } catch (error) {
      setErrors({ otp: "Failed to resend OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#f1f5f4] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#535e51] rounded-full flex items-center justify-center mx-auto mb-4">
         <KeyRound  className="text-[#f1f5f4]"/>
          </div>
          <h1 className="text-2xl font-bold text-[#535e51] mb-2">
            {isOtpSent ? "Verify OTP" : "Login with OTP"}
          </h1>
          <p className="text-[#535e51]">
            {isOtpSent
              ? `Enter the 6-digit code sent to +91${phoneNumber}`
              : "Enter your mobile number to receive OTP"}
          </p>
        </div>

        {!isOtpSent ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#535e51] mb-2"
              >
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-[#535e51] text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`block w-full pl-12 pr-4 py-3 border rounded-lg   ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <button
              onClick={handleSendOtp}
              disabled={isLoading || phoneNumber.length !== 10}
              className="w-full bg-[#535e51] text-white py-3 px-4 rounded-lg font-medium  disabled:opacity-50 disabled:cursor-not-allowed "
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending OTP...
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter OTP
              </label>
              <div className="flex space-x-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg  ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={1}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="mt-2 text-sm text-red-600 text-center">
                  {errors.otp}
                </p>
              )}
            </div>

            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-gray-600">
                  Resend OTP in{" "}
                  <span className="font-medium text-[#535e51]">
                    {formatTimer(timer)}
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-indigo-600  font-medium text-sm focus:outline-none focus:underline disabled:opacity-50"
                >
                  {isLoading ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying || otp.join("").length !== 6}
              className="w-full bg-[#535e51] text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify & Login"
              )}
            </button>

            <button
              onClick={() => {
                setIsOtpSent(false);
                setOtp(["", "", "", "", "", ""]);
                setTimer(60);
                setCanResend(false);
                setErrors({});
              }}
              className="w-full text-gray-600 hover:text-gray-700 font-medium text-sm focus:outline-none focus:underline"
            >
              Change Phone Number
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, KeyRound } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { sendOtpAction, verifyOtpAction } from "../redux/action/login";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OTPLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; otp?: string }>({});

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // Countdown timer
  useEffect(() => {
    if (!isOtpSent || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const router = useRouter();
  const goTohome = () => {
    router.push("/");
  };
  const validatePhoneNumber = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      if (errors.phone) setErrors({ ...errors, phone: "" });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errors.otp) setErrors({ ...errors, otp: "" });
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const sendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrors({ phone: "Please enter a valid 10-digit mobile number" });
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(sendOtpAction(phoneNumber));
      toast.success("OTP sent successfully!");
      setIsOtpSent(true);
      setTimer(60);
      setCanResend(false);
    } catch (error: any) {
      toast.error(`Failed to send OTP: ${error?.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit OTP" });
      return;
    }

    setIsLoading(true);

    try {
      const result: any = await dispatch(verifyOtpAction(phoneNumber, code));

      console.log("OTP API Response:", result);

      if (result?.token) {
        // ✅ Token exists → success
        toast.success(result?.message || "Login successful!");
        router.push("/");
      } else {
        throw new Error(result?.message || "OTP verification failed");
      }
    } catch (error: any) {
      toast.error(
        `OTP verification failed: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  const resendOtp = async () => {
    if (!phoneNumber) return;
    setIsLoading(true);
    setOtp(["", "", "", "", "", ""]);
    try {
      await dispatch(sendOtpAction(phoneNumber));
      toast.success("OTP resent successfully!");
      setTimer(60);
      setCanResend(false);
    } catch (error: any) {
      toast.error(`Failed to resend OTP: ${error?.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f1f5f4] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <ArrowLeft onClick={goTohome} className="cursor-pointer" />
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#535e51] rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="text-[#f1f5f4]" />
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
          <>
            <label className="block text-sm font-medium text-[#535e51] mb-2">
              Mobile Number
            </label>
            <div className="relative mb-4">
              <span className="absolute left-3 top-3 text-[#535e51]">+91</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className={`block w-full pl-12 pr-4 py-3 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600 mb-4">{errors.phone}</p>
            )}
            <button
              onClick={sendOtp}
              disabled={isLoading || phoneNumber.length !== 10}
              className="w-full bg-[#535e51] text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Enter OTP
            </label>
            <div className="flex space-x-3 justify-center mb-4">
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
                  className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={1}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-sm text-red-600 text-center mb-4">
                {errors.otp}
              </p>
            )}
            {!canResend ? (
              <p className="text-sm text-gray-600 text-center mb-4">
                Resend OTP in{" "}
                <span className="font-medium text-[#535e51]">
                  {formatTimer(timer)}
                </span>
              </p>
            ) : (
              <button
                onClick={resendOtp}
                disabled={isLoading}
                className="text-indigo-600 font-medium text-sm mb-4"
              >
                {isLoading ? "Resending..." : "Resend OTP"}
              </button>
            )}
            <button
              onClick={verifyOtp}
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full bg-[#535e51] text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 mb-2"
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
            </button>
            <button
              onClick={() => {
                setIsOtpSent(false);
                setOtp(["", "", "", "", "", ""]);
                setTimer(60);
                setCanResend(false);
                setErrors({});
              }}
              className="w-full text-gray-600 text-sm"
            >
              Change Phone Number
            </button>
          </>
        )}
      </div>
    </div>
  );
}



 
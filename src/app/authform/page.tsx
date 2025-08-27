/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { sendOtpAction, verifyOtpAction } from "../redux/action/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OTPLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OTPLoginDialog({
  open,
  onOpenChange,
}: OTPLoginDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; otp?: string }>({});

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

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
      if (result?.token) {
        toast.success(result?.message || "Login successful!");
        onOpenChange(false); // close dialog
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
    <section>
    
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="w-full max-w-xm sm:max-w-md px-4   sm:px-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            {isOtpSent ? "Verify OTP" : "Login with OTP"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {isOtpSent
              ? `Enter the 6-digit code sent to +91${phoneNumber}`
              : "Enter your mobile number to receive OTP"}
          </DialogDescription>
        </DialogHeader>

        {!isOtpSent ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">+91</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`block w-full pl-12 pr-4 py-3 border rounded-lg text-sm sm:text-base ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={sendOtp}
                disabled={isLoading || phoneNumber.length !== 10}
                className="bg-[#535e51] text-white w-full"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter OTP
              </label>
              <div className="flex flex-wrap justify-center gap-3">
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
                    className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border rounded-lg ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={1}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-sm text-red-600 text-center mt-2">
                  {errors.otp}
                </p>
              )}
            </div>

            {!canResend ? (
              <p className="text-sm text-gray-600 text-center">
                Resend OTP in{" "}
                <span className="font-medium text-[#535e51]">
                  {formatTimer(timer)}
                </span>
              </p>
            ) : (
              <button
                onClick={resendOtp}
                disabled={isLoading}
                className="text-indigo-600 font-medium text-sm text-center w-full"
              >
                {isLoading ? "Resending..." : "Resend OTP"}
              </button>
            )}

            <DialogFooter className="flex flex-wrap sm:flex-row gap-2">
              <Button
                onClick={verifyOtp}
                disabled={isLoading || otp.join("").length !== 6}
                className="bg-[#535e51] text-white w-full"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp(["", "", "", "", "", ""]);
                  setTimer(60);
                  setCanResend(false);
                  setErrors({});
                }}
                className="w-full"
              >
                Change Phone Number
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </section>
  );
}

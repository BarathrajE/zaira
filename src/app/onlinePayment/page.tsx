/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { apiRequest } from "../redux/apiRequest";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "sonner";

interface CheckoutButtonProps {
  orderData: {
    products: Array<{
      productId: string;
      size: string | null;
      quantity: number;
    }>;
    paymentMethod: string;
    designPrint: boolean;
    designId: string | null;
    address: string;
  };
  totalAmount: number;
  onSuccess: () => void;
  isProcessing: boolean;
}

export default function CheckoutButton({
  orderData,
  totalAmount,
  onSuccess,
  isProcessing,
}: CheckoutButtonProps) {
  const user = useSelector((state: RootState) => state.login.login.data.user);

  const handlePayment = async () => {
    if (!user?._id) {
      toast.error("User not logged in!");
      return;
    }

    if (typeof window === "undefined" || !(window as any).Razorpay) {
      toast.error("Payment service unavailable. Please refresh the page.");
      return;
    }

    try {
      // 1. Create order on backend
      const response = await apiRequest(
        `/order/create/${user._id}`,
        "POST",
        {
          ...orderData,
          totalAmount,
          paymentMethod: "Online" // Explicitly set payment method
        },
        true,
        true
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to create order");
      }

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: response.paymentOrder.amount,
        currency: response.paymentOrder.currency,
        name: "Your Company Name",
        description: "Payment for your order",
        order_id: response.paymentOrder.id,
        handler: async function (paymentResponse: any) {
          try {
            // 3. Verify payment with backend
            const verifyResponse = await apiRequest(
              `/order/payment/verify`,
              "POST",
              {
                razorpay_order_id: response.paymentOrder.id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                userId: user._id,
                products: orderData.products,
                address: orderData.address,
                totalAmount,
                designTemplateId: orderData.designId,
              },
              true,
              true
            );

            if (!verifyResponse.success) {
              throw new Error(verifyResponse.message || "Payment verification failed");
            }

            toast.success("Payment successful! Order confirmed.");
            onSuccess();
          } catch (err:any) {
            console.error("Payment verification error:", err);
            toast.error(err.message || "Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "customer@example.com",
          contact: user?.phone || "9999999999",
        },
        notes: {
          address: orderData.address,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment process cancelled");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (failureResponse: any) {
        console.error("Payment failed:", failureResponse);
        toast.error(`Payment failed: ${failureResponse.error.description}`);
      });
      rzp.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Error processing payment. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={isProcessing}
      className={`w-full px-6 py-3 rounded text-white ${
        isProcessing ? "bg-[#535e51]" : "bg-[#535e51] hover:bg-[#4a5348]"
      } font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {isProcessing ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : "Pay Now"}
    </button>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { apiRequest } from "../redux/apiRequest";


export default function CheckoutButton() {
  const handlePayment = async () => {
    try {
      const order = await apiRequest("/razorpay", "POST", { amount: 500 }, false);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: function (response: any) {
          console.log("Payment Success:", response);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Pay Now
    </button>
  );
}

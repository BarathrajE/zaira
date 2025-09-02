/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

export default function CheckoutButton() {
  const handlePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ amount: 500 }),
    });
    const order = await res.json();

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
  };

  return (
    <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white">
      Pay Now
    </button>
  );
}

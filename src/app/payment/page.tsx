/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ArrowLeft, CreditCard, Banknote, Loader2 } from "lucide-react";
import Footer from "@/footer/page";
import Header from "@/header/pages";
import { useRouter } from "next/navigation";
import PaymentSuccessDialog from "../../swiperSide/paymentpopup";
import { useSearchParams } from "next/navigation";
import { createOrderAction } from "../redux/action/order/createOrder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAddressesAction } from "../redux/action/profile/addressGet";
import { toast } from "sonner";

type PaymentOption = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
};

// Simplified payment options - only Cash on Delivery and Online Payment
const paymentOptions: PaymentOption[] = [
  {
    id: "cashOnDelivery",
    title: "Cash on Delivery",
    subtitle: "Pay when your order is delivered",
    icon: Banknote,
  },
  {
    id: "onlinePayment",
    title: "Online Payment",
    subtitle: "Pay securely via Razorpay",
    icon: CreditCard,
  },
];

interface ProductItem {
  productId: string | null;
  quantity: number | string | null;
  size?: string | null;
}
const PaymentPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load (e.g. images, API, etc.)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [selectedPayment, setSelectedPayment] = useState("cashOnDelivery");
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [validProducts, setValidProducts] = useState<ProductItem[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemTotal = searchParams.get("itemTotal");
  const savings = searchParams.get("savings");
  const billTotal = searchParams.get("billTotal");
  const productsId = searchParams.get("ids");
  const productsIds = searchParams.get("id");
  const Sizeid = searchParams.get("sizeId");
  console.log("Sizeid:", Sizeid);

  const quantity = searchParams.get("quantity");

  const dispatch = useDispatch();
  const handlePaymentComplete = () => {
    setIsOpen(true);
  };

  const goToHome = () => {
    router.push("/");
    setIsOpen(false);
  };

  const goToOrderPage = () => {
    router.push("/order");
    setIsOpen(false);
  };

  const goToAddressPage = () => {
    window.history.back(); // or router.push("/address")
  };

  // Handle Razorpay payment
  const initiateRazorpayPayment = () => {
    setIsProcessing(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add your Razorpay key
      amount: 4374900,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      order_id: "", // This should come from your backend
      handler: function (response: any) {
        console.log("Payment successful:", response);
        setIsProcessing(false);
        handlePaymentComplete();
        setIsOpen(true);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#535e51",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    if (typeof window !== "undefined" && (window as any).Razorpay) {
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } else {
      console.error("Razorpay SDK not loaded");
      setIsProcessing(false);
    }
  };

  const addresses = useSelector(
    (state: RootState) => state.AddressGet.addresses
  );
  const addressId = addresses?.[0]?._id || null;

  const userId = useSelector(
    (state: RootState) => state.login.login.data.user?._id
  );

  useEffect(() => {
    if (userId) {
      dispatch(getAddressesAction(userId) as any);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const rawIds = productsId || productsIds;

    if (!rawIds) {
      console.error("Missing product ID");
      return;
    }

    const ids = rawIds
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    const productsPayload: ProductItem[] = ids.map((id) => ({
      productId: id,
      quantity: Number(quantity) || 1,
      size: Sizeid || null,
    }));

 

    setValidProducts(productsPayload);
  }, [productsId, productsIds, quantity, Sizeid]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validProducts.length) {
      toast.error("No valid products to order.");
      return;
    }

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    if (!addressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    console.log("Submitting order with:", {
      userId,
      validProducts,
      addressId,
      selectedPayment,
      billTotal,
    });

    const payload = {
      products: validProducts,
      address: addressId,
      paymentMethod: selectedPayment === "cashOnDelivery" ? "COD" : "Online",
      status: "Placed",
      designPrint: false,
      designId: null,
    };

    console.log("Final payload:", payload);

    try {
      if (selectedPayment === "cashOnDelivery") {
        setIsProcessing(true);
        const result = await dispatch<any>(createOrderAction(userId, payload));
        setIsProcessing(false);

        if (result?.success) {
          setIsOpen(true);
        } else {
        }
      } else if (selectedPayment === "onlinePayment") {
        initiateRazorpayPayment();
      }
    } catch (error) {
      setIsProcessing(false);
      console.error("Order submission error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  // Add Razorpay script to head
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <Header />
      <div className="bg-[#f1f5f4]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center gap-6 pb-3">
            <ArrowLeft
              onClick={goToAddressPage}
              className="cursor-pointer text-[#535e51] w-8 h-8"
            />
            <h1 className="text-[#535e51] font-bold text-[28px] sm:text-[40px]">
              Payment
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="md:col-span-2 space-y-4">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#535e51]">
                    Choose a Payment option
                  </h2>
                  <div className="space-y-3">
                    {paymentOptions.map((option) => {
                      const Icon = option?.icon;
                      const isSelected = selectedPayment === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => setSelectedPayment(option.id)}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                            isSelected
                              ? "border-[#535e51] bg-[#f1f5f4]"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#535e51] flex items-center justify-center">
                              <Icon className="text-white w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#535e51]">
                                {option.title}
                              </h3>
                              <p className="text-sm text-[#535e51] opacity-70">
                                {option.subtitle}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-[#535e51] bg-[#535e51]"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedPayment === "cashOnDelivery" && (
                    <div className="text-center">
                      <h3 className="font-semibold text-[#535e51] mb-2">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-[#535e51] opacity-70">
                        You can pay with cash when your order is delivered to
                        your doorstep.
                      </p>
                    </div>
                  )}
                  {selectedPayment === "onlinePayment" && (
                    <div className="text-center">
                      <h3 className="font-semibold text-[#535e51] mb-2">
                        Online Payment via Razorpay
                      </h3>
                      <p className="text-sm text-[#535e51] opacity-70">
                        Pay securely using Credit/Debit Card, UPI, Net Banking,
                        or Wallet.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full px-6 py-3 bg-[#535e51] text-white rounded-lg font-semibold hover:bg-[#4a5348] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {selectedPayment === "cashOnDelivery"
                      ? "Place Order"
                      : isProcessing
                      ? "Processing..."
                      : "Pay Now"}
                  </button>

                  <PaymentSuccessDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    goToOrderPage={goToOrderPage}
                    goToHome={goToHome}
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg text-[#535e51] font-bold mb-4">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">Item Total</span>
                    <span className="font-medium text-[#535e51]">
                      ₹ {itemTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">You Saved</span>
                    <span className="font-medium text-green-600">
                      ₹ {savings}
                    </span>
                  </div>
                  {selectedPayment === "cashOnDelivery" && (
                    <div className="flex justify-between">
                      <span className="text-[#535e51]">COD Charges</span>
                      <span className="font-medium text-[#535e51]">₹0</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg text-[#535e51] font-bold">
                        Bill Total
                      </span>
                      <span className="text-lg font-bold text-[#535e51]">
                        ₹ {billTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentPage;

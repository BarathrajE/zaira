"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  RefreshCw,
  Banknote,
} from "lucide-react";
import Footer from "@/footer/page";
import Header from "@/header/pages";
import { useRouter } from "next/navigation";

type PaymentOption = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
};

type FormData = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  upiId: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const paymentOptions: PaymentOption[] = [
  {
    id: "creditCard",
    title: "Credit Card",
    subtitle: "Save & Pay via Credit Cards",
    icon: CreditCard,
  },
  {
    id: "debitCard",
    title: "Debit Card",
    subtitle: "Save & Pay via Debit Cards",
    icon: CreditCard,
  },
  {
    id: "upi",
    title: "UPI",
    subtitle: "PhonePe, Google Pay, etc.",
    icon: Smartphone,
  },
  {
    id: "netBanking",
    title: "Net Banking",
    subtitle: "Select from bank list",
    icon: Building2,
  },
  {
    id: "exchangeOrder",
    title: "Exchange Order",
    subtitle: "Only for exchange orders",
    icon: RefreshCw,
  },
  {
    id: "cashOnDelivery",
    title: "Cash on Delivery",
    subtitle: "Pay via cash",
    icon: Banknote,
  },
];

const PaymentPage: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("creditCard");
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const goToaddressPage = () => {
    window.history.back(); // or use router.push("/address")
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/g, "")
      .match(/.{1,4}/g)
      ?.join(" ")
      .substr(0, 19) || "";

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    return v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { cardNumber, expiryDate, cvv, upiId } = formData;

    if (["creditCard", "debitCard"].includes(selectedPayment)) {
      if (!cardNumber) newErrors.cardNumber = "Card number is required";
      if (!expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!cvv) newErrors.cvv = "CVV is required";
    }

    if (selectedPayment === "upi" && !upiId) {
      newErrors.upiId = "UPI ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Payment processed via ${selectedPayment}`);
    }
  };
  const router = useRouter();
  const goToorderPage = () => {
    router.push("/order");
  };
  return (
    <>
      <Header />
      <div className="bg-[#f1f5f4]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center gap-6 pb-3">
            <ArrowLeft
              onClick={goToaddressPage}
              className="cursor-pointer text-[#535e51] w-8 h-8"
            />
            <h1 className="text-[#535e51] font-bold text-[28px] sm:text-[40px]">
              Payment
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side (form) */}
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
                      const Icon = option.icon;
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

                {/* Inputs */}
                {["creditCard", "debitCard"].includes(selectedPayment) && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cardNumber: formatCardNumber(e.target.value),
                        }))
                      }
                      className={`w-full p-3 border-2 rounded-lg bg-[#f1f5f4] ${
                        errors.cardNumber ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Card Number"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            expiryDate: formatExpiryDate(e.target.value),
                          }))
                        }
                        maxLength={5}
                        className={`w-full p-3 border-2 rounded-lg bg-[#f1f5f4] ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-200"
                        }`}
                        placeholder="MM/YY"
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                        className={`w-full p-3 border-2 rounded-lg bg-[#f1f5f4] ${
                          errors.cvv ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === "upi" && (
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-lg bg-[#f1f5f4] ${
                      errors.upiId ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="yourname@upi"
                  />
                )}

                <button
                  type="submit"
                  onClick={goToorderPage}
                  className="w-full mt-6 py-3 bg-[#535e51] text-white font-semibold rounded-lg hover:bg-opacity-90 transition cursor-pointer"
                >
                  Complete Payment
                </button>
              </form>
            </div>

            {/* Right side (summary) */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg text-[#535e51] font-bold mb-4">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">Item Total</span>
                    <span className="font-medium text-[#535e51]">₹45,092</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">You Saved</span>
                    <span className="font-medium text-green-600">-₹1343</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg text-[#535e51] font-bold">
                        Bill Total
                      </span>
                      <span className="text-lg font-bold text-[#535e51]">
                        ₹43,749
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

"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useRouter } from "next/navigation";

const CheckoutComponent = () => {
   const router = useRouter();
    const goToaddressPage = () => {
      router.push("/address");
    };
  return (
    <section className="bg-[#f1f5f4]">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 ">
        <p className="text-[#535e51]  pb-4 font-bold text-[28px] sm:text-[45px]">
          Shopping Cart
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Product List (2/3 width on md+) */}
          <div className="md:col-span-2 space-y-4">
            {/* Product Item */}
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-start space-x-4">
                <div className="w-40 h-40 rounded-lg overflow-hidden ">
                  <Image
                    src="/assets/homeSlide_image/projectimg/t shirt-12.jpg"
                    alt="Product"
                    width={500}
                    height={400}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between flex-wrap gap-4">
                    {/* Left Side: Product Info */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold text-[#535e51]">
                        POLO SHIRT
                      </h3>
                      <p className="text-sm text-gray-600">
                        Colour: <strong>Black</strong>
                      </p>
                      <div className="mt-1">
                        <span className="text-lg font-bold text-[#535e51]">
                          ₹1710
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Size, Qty, Delete */}
                    <div className="flex items-start gap-4">
                      {/* Size */}
                      <div>
                        <label
                          htmlFor="size"
                          className="block text-sm text-gray-600 mb-1"
                        >
                          Size
                        </label>
                        <select
                          id="size"
                          className="rounded-md px-2 py-1 text-sm"
                          defaultValue="xl"
                        >
                          <option value="s">S</option>
                          <option value="m">M</option>
                          <option value="l">L</option>
                          <option value="xl">XL</option>
                          <option value="xxl">XXL</option>
                        </select>
                      </div>

                      {/* Qty */}
                      <div>
                        <label
                          htmlFor="qty"
                          className="block text-sm text-gray-600 mb-1"
                        >
                          Qty
                        </label>
                        <input
                          id="qty"
                          type="number"
                          min="1"
                          defaultValue="1"
                          className="w-16  rounded-md px-2 py-1 text-sm"
                        />
                      </div>

                      {/* Delete Button */}
                      <button className="text-red-500 hover:text-red-700 mt-6">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add more items here if needed */}
          </div>

          {/* Right: Order Summary (1/3 width on md+) */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="text-lg text-[#535e51] font-bold mb-4">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#535e51]">Item Total</span>
                  <span className="font-medium text-[#535e51]">₹45,092</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#535e51]">You Saved</span>
                  <span className="font-medium text-green-600">-₹1343</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div> */}
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg text-[#535e51] font-bold">Bill Total</span>
                    <span className="text-lg font-bold text-[#535e51]">
                      ₹43,749
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-[#535e51]  py-3 rounded-lg text-white  cursor-pointer" onClick={goToaddressPage}>
                Proceed to Checkout
              </button>
              <button className="w-full border bg-[#535e51] py-3 rounded-lg text-white">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default CheckoutComponent;

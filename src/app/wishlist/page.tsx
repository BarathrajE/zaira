/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Header from "@/header/pages";
import Footer from "@/footer/page";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 4,
      name: "Minimalist Desk Lamp",
      price: 89.5,
      image: "/assets/homeSlide_image/men/men15.jpeg",
    },
    {
      id: 5,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "/assets/homeSlide_image/men/men15.jpeg",
    },
    {
      id: 6,
      name: "Ceramic Coffee Mug Set",
      price: 45.0,
      image: "/assets/homeSlide_image/men/men15.jpeg",
    },
  ]);

  const removeFromWishlist = (id: any) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <section className="bg-[#f1f5f4]">
      <Header />
      <div className="max-w-6xl mx-auto p-6  ">
        <h1 className="text-3xl font-bold text-[#535e51]  mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-500 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400">Start adding products you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={400}
                    width={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg  text-[#535e51] font-bold mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-[#535e51] font-bold">
                      ${item.price}
                    </span>
                    <button className="bg-[#535e51] cursor-pointer text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Wishlist;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getWishlistAction } from "../../redux/action/wishlist/getwishlist";
import { removeWishlistAction } from "@/app/redux/action/wishlist/deletewishlist";
import { toast } from "sonner";
import LoadingOverlay from "@/_components/LoadingOverlay";

const Wishlist = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [bootLoading, setBootLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      dispatch(getWishlistAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const timer = setTimeout(() => setBootLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Redux wishlist state
  const wishlist = useSelector(
    (state: RootState) => state.getWishlist.wishlist || []
  );

  const removeFromWishlist = async (productId: string) => {
    if (!userId) {
      toast.error("Please login to remove from wishlist");
      return;
    }

    try {
      const result = await dispatch(removeWishlistAction(userId, productId));
      
      // Check if the result indicates success (no error message)
      if (result && !result.message) {
        toast.success("Removed from wishlist");
        // Refresh the wishlist from server after successful removal
        dispatch(getWishlistAction(userId));
      } else {
        // Handle specific error messages
        const errorMessage = result?.message || "Failed to remove from wishlist";
        if (errorMessage === "Item not found in wishlist") {
          toast.error("Item is no longer in your wishlist");
          // Refresh wishlist to sync with server state
          dispatch(getWishlistAction(userId));
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  if (bootLoading) return <LoadingOverlay />;

  return (
    <section className="bg-[#f1f5f4]">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#535e51] mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-500 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400">Start adding products you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <Image
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    height={400}
                    width={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.productId._id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-[#535e51] font-bold mb-2 line-clamp-2">
                    {item.productId.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-[#535e51] font-bold">
                      ${item.productId.price}
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
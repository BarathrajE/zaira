/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Star, Share2, Heart, ShoppingCart, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { allProductGetAction } from "@/app/redux/action/product/allProduct";
import { RootState } from "@/app/redux/store";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { addWishlistAction } from "@/app/redux/action/wishlist/addwishlist";
import { toast } from "sonner";
import { addToCart } from "@/app/redux/action/cart/addCart";
import LoadingOverlay from "@/_components/LoadingOverlay";

interface Size {
  _id: string;
  size: string;
}

interface Product {
  _id: string;
  name: string;
  heading: string;
  subheading: string;
  price: number;
  rating: number;
  imageUrl: string;
  sizes: Size[];
}

export default function ProductDisplayPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.allProduct
  );
  const [selectedSizeId, setSelectedSizeId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("/placeholder.jpg");
  const router = useRouter();

  const headers = ["STANDARD SIZE", "36", "38", "40", "42", "44"];
  const rows = [
    { label: "brand size", values: ["S", "M", "L", "XL", "2XL"] },
    { label: "Chest (In)", values: ["39", "41", "43", "45", "47"] },
    { label: "length (in)", values: ["28", "28.5", "29", "29.5", "29.5"] },
    { label: "shoulder (in)", values: ["17.5", "18", "18.5", "19", "20"] },
  ];

  const userId = useSelector(
    (state: RootState) => state.login.login.data.user?._id
  );
  const productId = product?._id;

  // Fetch product by ID
  useEffect(() => {
    if (id) dispatch(allProductGetAction(id) as any);
  }, [dispatch, id]);

  // Set main image
  useEffect(() => {
    if (product?.imageUrl) setSelectedImage(product.imageUrl);
  }, [product]);

  // Wishlist handler
  const handleWishlist = async () => {
    if (!userId) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      await dispatch(addWishlistAction(userId, productId) as any);
      setIsWishlisted(!isWishlisted);
      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      toast.error("Failed to update wishlist");
    }
  };

  // Add to Cart handler
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add to cart");
      return;
    }
    if (!selectedSizeId) {
      toast.error("Please select a size before adding to cart");
      return;
    }
    try {
      const items = [
        {
          productId: product._id,
          sizeId: selectedSizeId,
          quantity: quantity,
        },
      ];
      await dispatch(addToCart(userId, items) as any);
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add product to cart");
    }
  };

  // Buy Now handler
  const handlebuyNow = () => {
    if (!selectedSizeId) {
      toast.error("Please select a size before proceeding");
      return;
    }
    router.push(`/address?id=${productId}&size=${selectedSizeId}&quantity=${quantity}`);
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Product",
        text: product?.description || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) return <LoadingOverlay />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen py-10 bg-[#f1f5f4]">
        <div className="max-w-[85%] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-8">
            {/* Image Section */}
            <div className="flex lg:items-start items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[520px] xl:max-w-[700px] h-[320px] sm:h-[400px] md:h-[580px] lg:h-[620px] xl:h-[800px] object-cover rounded-lg"
              />
            </div>
            {/* Details Section */}
            <div className="md:p-8">
              <div className="flex items-start justify-between mb-2 relative">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                {/* Wishlist and Share */}
                <div className="flex gap-2">
                  <button
                    onClick={handleWishlist}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isWishlisted
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{product.heading}</p>
              <p className="text-gray-600 mb-4">{product.subheading}</p>
              <p className="text-2xl font-bold text-green-600 mb-6">₹{product.price}</p>
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{product.rating}</span>
              </div>
              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Size</h3>
                  <div className="flex gap-6 flex-wrap">
                    {product.sizes.map((s: Size) => (
                      <button
                        key={s._id}
                        onClick={() => setSelectedSizeId(s._id)}
                        className={`py-2 px-4 border rounded-lg ${
                          selectedSizeId === s._id
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Static Size Chart */}
              <div className="overflow-x-auto sm:p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {headers.map((header, idx) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-gray-600 font-medium ${
                            idx === 0 ? "text-left" : "text-center"
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-600">{row.label}</td>
                        {row.values.map((value, j) => (
                          <td key={j} className="text-center py-3 px-4 text-gray-800">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border rounded-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border rounded-lg flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mb-10 w-full">
                <button
                  className="w-full sm:w-auto bg-[#535e51] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg"
                  onClick={handlebuyNow}
                >
                  <ShoppingCart className="w-5 h-5 inline-block mr-2" />
                  Buy Now
                </button>
                <button
                  className="w-full sm:w-auto border-2 border-[#535e51] py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-50 cursor-pointer"
                  onClick={handleAddToCart}
                >
                  <Plus className="w-5 h-5 inline-block mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

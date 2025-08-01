"use client";
import React, { useState } from "react";
import { Star, Share2, Heart, ShoppingCart, Plus } from "lucide-react";
import Image from "next/image";
import { Swiper } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Header from "@/header/pages";
import Footer from "@/footer/page";

interface ColorOption {
  name: string;
  value: string;
  label: string;
}

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const colors: ColorOption[] = [
    { name: "black", value: "#000000", label: "Black" },
    { name: "white", value: "#ffffff", label: "White" },
    { name: "navy", value: "#535e51", label: "Navy Blue" },
    { name: "gray", value: "#6b7280", label: "Gray" },
  ];

  const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"];

  const headers = ["STANDARD SIZE", "36", "38", "40", "42", "44"];

  const rows = [
    { label: "brand size", values: ["S", "M", "L", "XL", "2XL"] },
    { label: "Chest (In)", values: ["39", "41", "43", "45", "47"] },
    { label: "length (in)", values: ["28", "28.5", "29", "29.5", "29.5"] },
    { label: "shoulder (in)", values: ["17.5", "18", "18.5", "19", "20"] },
  ];
  const categories = [
    { title: "Women", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    { title: "Men", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    { title: "Kids", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    { title: "Beauty", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    { title: "Footwear", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    {
      title: "Accessories",
      imageUrl: "/assets/homeSlide_image/womenSlide.webp",
    },
    { title: "Jewellery", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    {
      title: "Home Decor",
      imageUrl: "/assets/homeSlide_image/womenSlide.webp",
    },
    { title: "Grocery", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
    {
      title: "Electronics",
      imageUrl: "/assets/homeSlide_image/womenSlide.webp",
    },
  ];
  const handleShare = (): void => {
    if (navigator.share) {
      navigator.share({
        title: "Premium Cotton T-Shirt",
        text: "Check out this amazing product!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  const images = [
    "/assets/homeSlide_image/tShirt.webp",
    "/assets/homeSlide_image/Trending.webp",
    "/assets/homeSlide_image/trandingSlide.webp",
    "/assets/homeSlide_image/tShirt.webp",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <>
    <Header />
    <div className="min-h-screen  py-8">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white  overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image Section */}
            <div className="relative">
              {/* Main Image */}
              <div className=" flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="Product Image"
                  width={700}
                  height={500}
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-4 mt-4 px-6">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-lg border-2 ${
                      selectedImage === img
                        ? "border-blue-500"
                        : "border-transparent"
                    } cursor-pointer overflow-hidden`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                {/* Product Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Premium Cotton T-Shirt
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Comfortable & Stylish
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
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

                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i: number) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.8 (124 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                      $49.99
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      $69.99
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                      30% OFF
                    </span>
                  </div>
                 
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Color
                  </h3>
                  <div className="flex space-x-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                          selectedColor === color.name
                            ? "border-0"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      >
                        {color.name === "white" && (
                          <div className="w-full h-full rounded-full border border-gray-200"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Size
                  </h3>
                  <div className="grid grid-cols-6 gap-2">
                    {sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 border rounded-lg font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="  bg-white">
                  <div className="mb-6">
                    {/* Title */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-600">
                        SIZE CHART
                      </h2>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>centimeter</span>
                        <span className="font-medium text-gray-800">inch</span>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 text-gray-600">
                                {row.label}
                              </td>
                              {row.values.map((value, j) => (
                                <td
                                  key={j}
                                  className="text-center py-3 px-4 text-gray-800"
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className=" flex gap-5 flex-wrap xl:flex-nowrap">
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>

                <button className="w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[#535e51] font-bold text-[28px]  sm:text-[45px]">
            Recommended for you
          </p>
          <Swiper
            spaceBetween={10}
            loop={false}
            freeMode={true}
            modules={[Pagination, FreeMode]}
            className="mySwiper mt-5"
            breakpoints={{
              320: { slidesPerView: 4, spaceBetween: 0 },
              424: { slidesPerView: 4 },
              768: { slidesPerView: 3.5, spaceBetween: 0 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
              1440: { slidesPerView: 6 },
              1600: { slidesPerView: 6 },
            }}
          >
            <div className="flex overflow-x-auto space-x-4 mt-5 md:ps-1 px-3 md:gap-15 scrollbar-hide">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center flex-none"
                >
                  <Image
                    src={item.imageUrl}
                    width={400}
                    height={400}
                    alt={item.title}
                    className="md:rounded-lg rounded-[50%] md:w-[200px] w-[80px] md:h-auto h-[80px] object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  />
                  <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

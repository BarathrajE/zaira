"use client";
import { Swiper } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const womenCategories = [
  {
    title: "Full Sleeve",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-12.jpg",
  },
  {
    title: "Scoop Neck",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-9.jpg",
  },
  {
    title: "Crew Neck",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-23.jpg",
  },
  {
    title: "Oversized T-shirt",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-18.jpg",
  },
  {
    title: "Sleeveless",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-46.jpg",
  },
];

const menCategories = [
  {
    title: "Polo",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-28.jpg",
  },
  {
    title: "Hoodie",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-27.jpg",
  },
  {
    title: "Crew Neck",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-33.jpg",
  },
  {
    title: "Graphic Tee",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-41.jpg",
  },
  {
    title: "Tank Top",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-35.jpg",
  },
];

const MenCategorySlide = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load (e.g. images, API, etc.)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  const [activeCategory, setActiveCategory] = useState<"women" | "men">(
    "women"
  );

  const categories =
    activeCategory === "women" ? womenCategories : menCategories;
  if (loading) return LoadingOverlay();
  return (
    <section className="flex justify-center">
      <div className="pb-5 max-w-7xl">
        {/* Category Selection Buttons */}
        <div className="flex justify-center gap-4 mt-4 mb-6">
          <button
            onClick={() => setActiveCategory("women")}
            className={`px-6 py-2 rounded-md font-semibold ${
              activeCategory === "women"
                ? "bg-[#535e51] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            T-SHIRT
          </button>
          <button
            onClick={() => setActiveCategory("men")}
            className={`px-6 py-2 rounded-md font-semibold ${
              activeCategory === "men"
                ? "bg-[#535e51] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            SHIRT
          </button>
        </div>

        {/* Swiper Carousel */}
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
          <div className="flex overflow-x-auto space-x-4 mt-5 md:ps-15 px-3 md:gap-15 scrollbar-hide">
            {categories.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center flex-none cursor-pointer"
              >
                <Image
                  src={item.imageUrl}
                  width={400}
                  height={400}
                  alt={item.title}
                  className="md:rounded-lg rounded-[50%] md:w-[150px] w-[80px] md:h-auto h-[80px] object-cover transition-transform duration-300 hover:scale-105"
                />
                <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default MenCategorySlide;

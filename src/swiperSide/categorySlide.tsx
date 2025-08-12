"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  {
    title: "Women",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-4.jpg",
  },
  {
    title: "Men",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-10.jpg",
  },
  {
    title: "Kids",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-6.jpg",
  },
  {
    title: "Beauty",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-12.jpg",
  },
  {
    title: "Footwear",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-16.jpg",
  },
  {
    title: "Accessories",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-48.jpg",
  },
  {
    title: "Jewellery",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-40.jpg",
  },
  {
    title: "Home Decor",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-31.jpg",
  },
  {
    title: "Grocery",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-30.jpg",
  },
  {
    title: "Electronics",
    imageUrl: "/assets/homeSlide_image/projectimg/t shirt-23.jpg",
  },
];

const CategorySlide = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMenClick = () => {
    setIsLoading(true);
    router.push("/mencollection");
  };

  const handleWomenClick = () => {
    setIsLoading(true);
    router.push("/womencollection");
  };

  // Loading overlay
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );
  return (
    <div className="pb-5 relative">
      <p className="text-[#535e51] font-bold text-[15px] text-center sm:text-[25px]">
        Shop By
      </p>
      <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
        CATEGORY
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
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <Image
                src={item.imageUrl}
                width={200}
                height={200}
                alt={item.title}
                onClick={
                  item.title === "Men"
                    ? handleMenClick
                    : item.title === "Women"
                    ? handleWomenClick
                    : undefined
                }
                className="md:rounded-lg rounded-full w-[80px] md:w-[200px] h-[80px] md:h-auto object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
              <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                {item.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default CategorySlide;

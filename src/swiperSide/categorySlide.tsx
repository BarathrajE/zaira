"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const categories = [
  { title: "Women", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-4.jpg" },
  { title: "Men", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-10.jpg" },
  { title: "Kids", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-6.jpg" },
  { title: "Beauty", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-12.jpg" },
  { title: "Footwear", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-16.jpg" },
  { title: "Accessories", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-48.jpg" },
  { title: "Jewellery", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-40.jpg" },
  { title: "Home Decor", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-31.jpg" },
  { title: "Grocery", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-30.jpg" },
  { title: "Electronics", imageUrl: "/assets/homeSlide_image/projectimg/t shirt-23.jpg" },
];

const CategorySlide = () => {
  return (
    <div className="pb-5">
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
        <div className="flex overflow-x-auto space-x-4 mt-5 md:ps-15 px-3 md:gap-15 scrollbar-hide">
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
  );
};

export default CategorySlide;

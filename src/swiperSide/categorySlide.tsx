"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const categories = [
  { title: "Women", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Men", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Kids", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Beauty", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Footwear", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Accessories", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Jewellery", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Home Decor", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Grocery", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
  { title: "Electronics", imageUrl: "/assets/homeSlide_image/womenSlide.webp" },
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
        loop={true}
        modules={[Pagination]}
        className="mySwiper mt-5"
        breakpoints={{
          320: { slidesPerView: 4, spaceBetween: 0 },
          424: { slidesPerView: 4 },
          768: { slidesPerView: 3.5, spaceBetween: 0 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
          1440: { slidesPerView: 6 },
          1600: { slidesPerView: 7 },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center ">
              <Image
                src={item.imageUrl}
                width={400}
                height={400}
                alt={item.title}
                className="md:rounded-lg rounded-[50%] md:w-[200px] w-[80px] md:h-auto h-[80px]  object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
              <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                {item.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlide;

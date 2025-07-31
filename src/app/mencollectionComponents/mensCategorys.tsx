"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const categories = [
  { title: "Full Sleeve", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Scoop Neck", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Crew Neck", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Oversized T-shirt", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Sleeveless", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Printed", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Checked", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: " Linen", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Oversized Shirt", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
  { title: "Denim", imageUrl: "/assets/homeSlide_image/tShirt.webp" },
];

const  MenCategorySlide = () => {
  return (
    <div className="pb-5">
       
   <div className="flex justify-evenly flex-wrap py-3">
        <p className="bg-[#535e51] text-[#f1f5f4] font-bold text-[28px] border-2 shadow-2xl px-8 rounded-2xl py-1 text-center sm:text-[45px]">
          T-SHIRTS
        </p>
        <p className="bg-[#535e51] text-[#f1f5f4] font-bold text-[28px] border-2 shadow-2xl px-8 rounded-2xl py-1 text-center sm:text-[45px]">
          SHIRTS
        </p>
      </div>
      <Swiper
        spaceBetween={10}
        loop={true}
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

export default MenCategorySlide;

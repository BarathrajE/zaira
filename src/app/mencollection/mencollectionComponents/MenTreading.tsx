"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
const slideImages = [
  "/assets/homeSlide_image/projectimg/t shirt-6.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-46.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-18.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-48.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-40.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-39.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-12.jpg",
  "/assets/homeSlide_image/projectimg/t shirt-6.jpg",
];
const MenTreading = () => {
  return (
    <section className="w-full overflow-hidden py-6 bg-cover bg-center">
      <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
        TRENDING NOW
      </p>
      <div className="swiper-wrapper w-full">
        <Swiper
          modules={[EffectCoverflow, Navigation, FreeMode]}
          loop={true}
          freeMode={true}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1800: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="mt-8 heritage-swiper w-full mx-auto"
        >
          {slideImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex justify-center">
                <Image
                  src={src}
                  width={500}
                  height={500}
                  alt={`Slide ${index + 1}`}
                  className="rounded-lg w-full  md:w-[300px] lg:w-[400px] h-auto object-cover transition-transform duration-300"
                />
                <div className="shop-btn absolute bottom-5 right-30 flex bg-[#f1f5f4] px-4 gap-2 rounded-lg py-2  ">
                  <ShoppingCart className="text-[#535e51] font-bold" />
                  <p className="text-[#535e51] font-bold">Shop</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Add these navigation buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </section>
  );
};

export default MenTreading;

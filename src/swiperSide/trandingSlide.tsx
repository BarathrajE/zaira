"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, FreeMode, Navigation, Pagination } from "swiper/modules";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
const slideImages = [
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
  "/assets/homeSlide_image/Trending.webp",
];
const HeritageSwiper = () => {
  return (
    <section className="w-full overflow-hidden py-6 bg-cover bg-center">
      <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
        TRENDING NOW
      </p>
      <div className="swiper-wrapper w-full">
        <Swiper
          modules={[EffectCoverflow, Navigation,FreeMode, Pagination]}
          effect="coverflow"
          loop={true}
           freeMode={true}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={1}
          breakpoints={{
            330: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -40,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
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
                  className="rounded-lg w-full sm:w-[400px] md:w-[450px] lg:w-[500px] h-auto object-cover transition-transform duration-300"
                />
                <div className="shop-btn absolute bottom-5 right-10 flex bg-[#f1f5f4] px-4 gap-2 rounded-lg py-2 opacity-0 transition-opacity duration-300">
                  <ShoppingCart className="text-[#535e51] font-bold" />
                  <p className="text-[#535e51] font-bold">Shop</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeritageSwiper;

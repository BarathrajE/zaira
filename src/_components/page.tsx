"use client";
import Image from "next/image";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slide = () => {
  return (
    <>
    <section>
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full min-h-screen">
            {" "}
            <Image
              src="/assets/homeSlide_image/Slider-OnamEssentials.webp"
              alt="Onam Essentials"
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[100vh]">
            {" "}
            <Image
              src="/assets/homeSlide_image/Slider-OnamEssentials.webp"
              alt="Onam Essentials"
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[100vh]">
            {" "}
            <Image
              src="/assets/homeSlide_image/Slider-OnamEssentials.webp"
              alt="Onam Essentials"
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    
    </>
  );
};

export default Slide;

"use client";
import VideoSlide from "@/swiperSide/videoSlide";
import Image from "next/image";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slide = () => {
  return (
    <>
      {/* swiper */}
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
                src="/assets/homeSlide_image/image.webp"
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
                src="/assets/homeSlide_image/image.webp"
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
                src="/assets/homeSlide_image/image.webp"
                alt="Onam Essentials"
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="text-center pt-4 bg-[#f1f5f4]">
        <p className="text-[#535e51] font-bold text-[28px] sm:text-[35px]">
          Recent Views
        </p>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-7xl overflow-x-auto px-4 sm:px-8">
            <div className="flex gap-6 mt-6 flex-nowrap w-max">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[min(80vw,300px)]"
                >
                  <Image
                    src="/assets/homeSlide_image/resent_view.webp"
                    width={500}
                    height={300}
                    alt="Onam Essentials"
                    className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  />
                  <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                    Premium
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="text-center pt-8 bg-[#f1f5f4]">
        <p className="text-[#535e51] font-bold text-[28px] sm:text-[35px]">
          Best Sellers
        </p>

        <div className="flex justify-center">
          <div className="w-full xl:max-w-[90%] lg:max-w-7xl  overflow-x-auto px-4 sm:px-8">
            <div className="flex gap-6 mt-6 flex-nowrap w-max">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[min(80vw,300px)]"
                >
                  <Image
                    src="/assets/homeSlide_image/bestseller_image.webp"
                    width={350}
                    height={200}
                    alt="Onam Essentials"
                    className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  />
                  <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                    Premium
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5">
        <Image
          src="/assets/homeSlide_image/menshop.webp"
          alt="Onam Essentials"
          width={1200}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
        <Image
          src="/assets/homeSlide_image/womenshop.webp"
          alt="Onam Essentials"
          width={1200}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
      </section>
      <section className="text-center  pt-8 bg-[#f1f5f4]">
        <VideoSlide />
      </section>
    </>
  );
};

export default Slide;

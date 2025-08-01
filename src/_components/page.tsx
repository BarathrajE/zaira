"use client";
import CategorySlide from "@/swiperSide/categorySlide";
import TrendingSlide from "@/swiperSide/trandingSlide";
import VideoSlide from "@/swiperSide/videoSlide";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slide = () => {
  const router = useRouter();
  const goToMen = () => {
    router.push("/mencollection");
  };
  const goTowomen = () => {
    router.push("/womencollection");
  };
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
          className="mySwiper w-full h-screen"
        >
          {[1, 2, 3].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-screen">
                <Image
                  src="/assets/homeSlide_image/image.webp"
                  alt="Onam Essentials"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* section category */}

      <section className=" pt-4 bg-[#f1f5f4]">
        <CategorySlide />
        <TrendingSlide />
      </section>

      <section className="pt-5 bg-[#f1f5f4]">
        <Image
          src="/assets/homeSlide_image/menshop.webp"
          alt="Onam Essentials"
          width={1200}
          height={500}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          onClick={goToMen}
        />
        <div className="pt-4 pb-10">
          <div>
            <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
              T-SHIRTS
            </p>

            <div className="flex flex-wrap justify-center gap-5 px-3 ">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="w-full sm:w-[45%] lg:w-[31%]">
                  <Image
                    src="/assets/homeSlide_image/tShirt.webp"
                    alt="T-Shirt"
                    width={600}
                    height={730}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                  <p className="text-center  text-[#535e51]  font-bold text-[28px] sm:text-[35px]">
                    POLO T-SHIRTS
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Image
          src="/assets/homeSlide_image/womenshop.webp"
          alt="Onam Essentials"
          width={1200}
          height={500}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          onClick={goTowomen}
        />
        <div className="pt-4 pb-10">
          <div>
            <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
              SHIRTS
            </p>

            <div className="flex flex-wrap justify-center gap-5  px-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="w-full sm:w-[45%] lg:w-[31%]">
                  <Image
                    src="/assets/homeSlide_image/tShirt.webp"
                    alt="T-Shirt"
                    width={600}
                    height={730}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                  <p className="text-center  text-[#535e51] font-bold text-[28px] sm:text-[35px]">
                    WOMEN T-SHIRTS
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
      <section className="pt-5 bg-[#f1f5f4]">
        <div className="pt-4 pb-10">
          <div className="px-3">
            <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
              BEST SERVICES
            </p>

            <div className="flex flex-wrap justify-center gap-5 ">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="w-full sm:w-[45%] lg:w-[31%]">
                  <Image
                    src="/assets/homeSlide_image/BEST.webp"
                    alt="T-Shirt"
                    width={600}
                    height={730}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                  <p className="text-center  text-[#535e51] font-bold text-[28px] sm:text-[35px]">
                    SERVICES
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="text-center  pt-8 bg-[#f1f5f4]">
        <VideoSlide />
      </section>
    </>
  );
};

export default Slide;

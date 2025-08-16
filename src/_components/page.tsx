"use client";
import { homeBannerGetAction } from "@/app/redux/action/banner/homebanner";
import { allProductGetAction } from "@/app/redux/action/product/allProduct";
import { bestServiceGetAction } from "@/app/redux/action/product/bestservice";
import { videoGetAction } from "@/app/redux/action/videofile/video";
import { AppDispatch, RootState } from "@/app/redux/store";
import CategorySlide from "@/swiperSide/categorySlide";
import TrendingSlide from "@/swiperSide/trandingSlide";
import VideoSlide from "@/swiperSide/videoSlide";
import { log } from "console";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface Banner {
  _id: string;
  title: string;
  image: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MainBanner {
  id: string;
  image: string;
  title: string;
}

const Slide = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const goToMen = () => {
    router.push("/mencollection");
  };
  const goTowomen = () => {
    router.push("/womencollection");
  };
  const goToproductPage = () => {
    router.push("/productdisplay");
  };

  useEffect(() => {
    dispatch(homeBannerGetAction());
    dispatch(allProductGetAction());
    dispatch(bestServiceGetAction());
    dispatch(videoGetAction());
  }, [dispatch]);

  const homebanner: Banner[] = useSelector(
    (state: RootState) => state.home.homeBanner
  );
  const allProduct: Banner[] = useSelector(
    (state: RootState) => state.allProduct.allProducts
  );
  const bestService: Banner[] = useSelector(
    (state: RootState) => state.bestService.bestServices
  );
  console.log("Best Service:", bestService);

  const mainBanners: MainBanner[] = homebanner
    .filter((banner: Banner) => banner.title === "main banner")
    .map((banner: Banner) => ({
      id: banner._id,
      image: banner.image,
      title: banner.title,
    }));

  const womenBanners = homebanner.filter(
    (banner: Banner) => banner.title === "women banner"
  );
  const firstWomenBanner = womenBanners[0];
  const menBanners = homebanner.filter(
    (banner: Banner) => banner.title === "men banner"
  );
  const firstMenBanner = menBanners[0];

  const offerBanners = homebanner.filter(
    (banner: Banner) => banner.title === "offfer banner"
  );
  const offerBanner = offerBanners[0];

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
          className="mySwiper bg-yellow-100"
        >
          {mainBanners.map((banner, index) => (
            <SwiperSlide key={banner.id || index}>
              <div className="relative w-full h-auto">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  width={1200} // Set an appropriate width
                  height={600} // Set an appropriate height
                  className="object-contain w-full h-auto"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1200px"
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
          src={
            firstMenBanner
              ? firstMenBanner.image
              : "/assets/homeSlide_image/menshop.webp"
          }
          alt={firstMenBanner ? firstMenBanner.title : "Onam Essentials"}
          width={1200}
          height={500}
          className="w-full h-full object-contain rounded-lg cursor-pointer"
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
                    src="/assets/homeSlide_image/projectimg/t shirt-6.jpg"
                    alt="T-Shirt"
                    width={800}
                    height={730}
                    className="rounded-lg w-full h-auto object-cover  cursor-pointer"
                    onClick={goToproductPage}
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
          src={
            firstWomenBanner
              ? firstWomenBanner.image
              : "/assets/homeSlide_image/womenshop.webp"
          }
          alt={firstWomenBanner ? firstWomenBanner.title : "Onam Essentials"}
          width={1200}
          height={500}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          onClick={goTowomen}
        />
        <div className="pt-4 pb-10">
          <div>
            <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
              T-SHIRTS
            </p>

            <div className="flex flex-wrap justify-center gap-5  px-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="w-full sm:w-[45%] lg:w-[31%]">
                  <Image
                    src="/assets/homeSlide_image/projectimg/t shirt-12.jpg"
                    alt="T-Shirt"
                    width={600}
                    height={730}
                    className="rounded-lg w-full h-auto object-cover cursor-pointer"
                    onClick={goToproductPage}
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
          className="mySwiper w-full h-auto"
          style={{ maxHeight: "80vh" }} 
        >
          <SwiperSlide>
            <div className="relative w-full min-h-[50vh] sm:min-h-[70vh] lg:min-h-[80vh]">
              <Image
                src={
                  offerBanner
                    ? offerBanner.image
                    : "/assets/homeSlide_image/womenshop.webp"
                }
                alt={offerBanner ? offerBanner.title : "Onam Essentials"}
                width={1200}
                height={600}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, (max-width: 1280px) 75vw, 1200px"
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-full min-h-[50vh] sm:min-h-[70vh] lg:min-h-[80vh]">
              <Image
                src={
                  offerBanner
                    ? offerBanner.image
                    : "/assets/homeSlide_image/womenshop.webp"
                }
                alt={offerBanner ? offerBanner.title : "Onam Essentials"}
                width={1200}
                height={600}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, (max-width: 1280px) 75vw, 1200px"
                className="object-cover w-full h-full cursor-pointer"
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
                    src="/assets/homeSlide_image/projectimg/t shirt-23.jpg"
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

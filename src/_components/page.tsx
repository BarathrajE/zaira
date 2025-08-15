"use client";
import { homeBannerGetAction } from "@/app/redux/action/banner/homebanner";
import { allProductGetAction } from "@/app/redux/action/product/allProduct";
import { AppDispatch, RootState } from "@/app/redux/store";
import CategorySlide from "@/swiperSide/categorySlide";
import TrendingSlide from "@/swiperSide/trandingSlide";
import VideoSlide from "@/swiperSide/videoSlide";
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
  }, [dispatch]);

  const homebanner: Banner[] = useSelector(
    (state: RootState) => state.home.homeBanner
  );
  const allProduct: Banner[] = useSelector(
    (state: RootState) => state.allProduct.allProducts
  );
  console.log(allProduct, "All Products");

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
          className="mySwiper w-full h-screen"
        >
          {mainBanners.map((banner, index) => (
            <SwiperSlide key={banner.id || index}>
              <div className="relative w-full h-screen">
                <Image
                  src={banner.image}
                  alt={banner.title}
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
          src={
            firstMenBanner
              ? firstMenBanner.image
              : "/assets/homeSlide_image/menshop.webp"
          }
          alt={firstMenBanner ? firstMenBanner.title : "Onam Essentials"}
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
        >
          <SwiperSlide>
            <div className="relative sm:w-full min-h-[50vh] sm:min-h-[70vh] lg:min-h-screen">
              <Image
                src={
                  offerBanner
                    ? offerBanner.image
                    : "/assets/homeSlide_image/womenshop.webp"
                }
                alt={offerBanner ? offerBanner.title : "Onam Essentials"}
                fill
                priority
                sizes="100vw"
                className="object-cover cursor-pointer sm:w-full w-[200px]"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative sm:w-full min-h-[50vh] sm:min-h-[70vh] lg:min-h-screen">
              <Image
                src={
                  offerBanner
                    ? offerBanner.image
                    : "/assets/homeSlide_image/womenshop.webp"
                }
                alt={offerBanner ? offerBanner.title : "Onam Essentials"}
                fill
                sizes="100vw"
                className="object-cover sm:w-full w-[200px]  cursor-pointer"
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

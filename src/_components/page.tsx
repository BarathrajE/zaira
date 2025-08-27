/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SubmenusPage from "@/app/product/submenu/[submenuId]/page";
import { homeBannerGetAction } from "@/app/redux/action/banner/homebanner";
import { homeTshirtGetAction } from "@/app/redux/action/banner/homeTshirt";
import { menuGetAction } from "@/app/redux/action/menu/menuGet";

import { bestServiceGetAction } from "@/app/redux/action/product/bestservice";
import { videoGetAction } from "@/app/redux/action/videofile/video";
import { AppDispatch, RootState } from "@/app/redux/store";
import CategorySlide from "@/swiperSide/categorySlide";
import TrendingSlide from "@/swiperSide/trandingSlide";
import VideoSlide from "@/swiperSide/videoSlide";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const goToproductPage = (id: string) => {
    router.push(`/productdisplay/${id}`);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load (e.g. images, API, etc.)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  const menuData = useSelector((state: RootState) => state.menuGet.menu);

  const userId: any = menuData && menuData.length > 0 ? menuData[0]._id : null;

  useEffect(() => {
    dispatch(homeBannerGetAction());
    dispatch(bestServiceGetAction());
    dispatch(videoGetAction());
    dispatch(menuGetAction());

    if (userId) {
      homeTshirtGetAction(userId)(dispatch);
    }
  }, [dispatch, userId]);

  const homebanner: Banner[] = useSelector(
    (state: RootState) => state.home.homeBanner
  );
  const homeTshirt = useSelector(
    (state: RootState) => state.homeTshirt.homeTshirt
  );

  const bestService: Banner[] = useSelector(
    (state: RootState) => state.bestService.bestServices
  );

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

  if (loading) return LoadingOverlay();

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

        {loading ? (
          LoadingOverlay()
        ) : (
          <div className="pt-4 pb-10">
            <div>
              <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
                T-SHIRTS
              </p>

              <div className="flex flex-wrap justify-center gap-5 px-3">
                {homeTshirt && homeTshirt.length > 0 ? (
                  homeTshirt.map((item: any, index: number) => (
                    <div
                      key={item._id || index}
                      className="w-full sm:w-[40%] lg:w-[26%]"
                    >
                      <Image
                        src={
                          item.imageUrl ||
                          ""
                        }
                        alt={item.name || "T-Shirt"}
                        width={800}
                        height={730}
                        className="rounded-lg w-full h-auto object-cover cursor-pointer"
                        onClick={() => goToproductPage(item._id)}
                      />
                      <p className="text-center text-[#535e51] font-bold text-[28px] sm:text-[35px]">
                        {item.name || "POLO T-SHIRTS"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No T-Shirts found</p>
                )}
              </div>
            </div>
          </div>
        )}

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
        <div className="pt-4 pb-10"></div>
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
          className="mySwiper relative w-full h-auto"
        >
          <SwiperSlide>
            <Image
              src={offerBanner ? offerBanner.image : "/assets/homeSlide_image/"}
              alt={offerBanner ? offerBanner.title : "Onam Essentials"}
              width={1200} // Set an appropriate width
              height={600} // Set an appropriate height
              className="object-contain w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1200px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={offerBanner ? offerBanner.image : "/assets/homeSlide_image/"}
              alt={offerBanner ? offerBanner.title : "Onam Essentials"}
              width={1200} // Set an appropriate width
              height={600} // Set an appropriate height
              className="object-contain w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1200px"
            />
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
              {bestService.map((service: any, index: number) => (
                <div
                  key={service.id || index}
                  className="w-full sm:w-[40%] lg:w-[26%]"
                >
                  <Image
                    src={
                      service.imageUrl ||
                      "/assets/homeSlide_image/projectimg/t shirt-23.jp"
                    }
                    alt={service.title || "Service"}
                    width={600}
                    height={730}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                  <p className="text-center text-[#535e51] font-bold text-[28px] sm:text-[35px]">
                    {service.title || "SERVICES"}
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

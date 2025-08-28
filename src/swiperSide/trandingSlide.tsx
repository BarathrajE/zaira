/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, FreeMode, Navigation } from "swiper/modules";
import { ShoppingCart, Loader2 } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { tradingProductGetAction } from "@/app/redux/action/product/treadingproduct";

interface MainBanner {
  id: string;
  image: string;
  title: string;
}
const HeritageSwiper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageClick = (id: string) => {
    setIsLoading(true);
    router.push(`/productdisplay/${id}`);
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(tradingProductGetAction());
  }, [dispatch]);
  const tradingProducts = useSelector(
    (state: RootState) => state.tradingProduct.tradingProducts
  );
  const tradingProductList: MainBanner[] =
    tradingProducts?.map((product: any) => ({
      id: product._id,
      image: product.imageUrl,
      title: product.name,
    })) || [];
  return (
    <section className="w-full overflow-hidden py-6 bg-cover bg-center relative">
      {/* Loading overlay */}
      {isLoading && (
        // Loading overlay

        <div className="fixed inset-0 bg-white bg-opacity-80 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
            <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
            <p className="text-[#535e51] font-medium">Loading...</p>
          </div>
        </div>
      )}

      <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
        TRENDING NOW
      </p>
      <div className="swiper-wrapper w-full">
        <div className="relative w-full mx-auto mt-8">
          {/* Navigation Buttons */}
          <div className="swiper-button-prev p-10 rounded-full "></div>
          <div className="swiper-button-next p-10 rounded-full "></div>

          <Swiper
            modules={[EffectCoverflow, Navigation, FreeMode]}
            effect="coverflow"
            loop={true}
            freeMode={true}
            centeredSlides={true}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
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
            className="heritage-swiper"
          >
            {tradingProductList.map((product: any, index: number) => (
              <SwiperSlide key={product.id || index}>
                <div className="relative flex justify-center  group">
                  <Image
                    src={product.image}
                    width={500}
                    height={500}
                    alt={product.title}
                    className="rounded-lg w-full sm:w-[400px] md:w-[450px] lg:w-[500px] h-auto object-cover transition-transform duration-300"
                  />
                  <div
                    className="shop-btn absolute bottom-5 right-10 flex bg-[#f1f5f4] px-4 gap-2 rounded-lg py-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleImageClick(product.id)}
                  >
                    <ShoppingCart className="text-[#535e51]" />
                    <p className="text-[#535e51] font-bold">Shop</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeritageSwiper;

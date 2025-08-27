/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, FreeMode, Navigation } from "swiper/modules";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchTrendingProducts } from "@/app/redux/action/mens/tranding";
import { useRouter } from "next/navigation";

const MenTreading = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(fetchTrendingProducts());
  }, [dispatch]);

  const trendingProducts = useSelector(
    (state: RootState) => state.getTrendingProducts.trendingProducts
  );
  console.log("Trending Products from store:", trendingProducts);

  const handleImageClick = (id: string) => {
    router.push(`/productdisplay/${id}`);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return LoadingOverlay();
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
          {trendingProducts.map((product: any, index: number) => (
            <SwiperSlide key={product._id || index}>
              <div className="relative flex justify-center">
                <Image
                  src={product.imageUrl}
                  width={500}
                  height={500}
                  alt={product.name}
                  className="rounded-lg w-full md:w-[300px] lg:w-[400px] h-auto object-cover transition-transform duration-300"
                />
                <div
                  className="shop-btn absolute bottom-5 right-5 flex bg-[#f1f5f4] px-4 gap-2 rounded-lg py-2"
                  onClick={() => {
                    handleImageClick(product._id);
                  }}
                >
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

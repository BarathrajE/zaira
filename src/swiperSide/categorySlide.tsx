/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { submenuGetAction } from "@/app/redux/action/menu/submenu";

interface Submenu {
  _id: string;
  name: string;
  imageUrl?: string;
}

const CategorySlide = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(submenuGetAction());
  }, [dispatch]);

  const submenuData = useSelector((state: RootState) => state.submenu.submenu);
  const submenuValues =
    submenuData?.map((submenu: Submenu) => ({
      id: submenu._id,
      name: submenu.name,
      image: submenu.imageUrl,
    })) ?? [];

  const handleMenClick = () => {
    setIsLoading(true);
    router.push("/mencollection");
  };

  const handleWomenClick = () => {
    setIsLoading(true);
    router.push("/womencollection");
  };

  const handleMenClicks = (id: string) => {
    // Handle Men click, e.g., navigate or open a submenu
    router.push(`/product/submenu/men/${id}`);
  };

  const handleWomenClicks = (id: string) => {
    // Handle Women click, e.g., navigate or open a submenu
    router.push(`/product/submenu/women/${id}`);
  };

  // Loading overlay
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );
  return (
    <div className="pb-5 relative">
      <p className="text-[#535e51] font-bold text-[15px] text-center sm:text-[25px]">
        Shop By
      </p>
      <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
        CATEGORY
      </p>

      <Swiper
        spaceBetween={10}
        loop={false}
        freeMode={true}
        modules={[Pagination, FreeMode]}
        className="mySwiper mt-5"
        breakpoints={{
          320: { slidesPerView: 4, spaceBetween: 0 },
          424: { slidesPerView: 4 },
          768: { slidesPerView: 3.5, spaceBetween: 0 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
          1440: { slidesPerView: 6 },
          1600: { slidesPerView: 6 },
        }}
      >
        {submenuValues.map((item: any, index: number) => (
          <SwiperSlide key={item.id ?? index}>
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <Image
                src={item.image || "/placeholder.jpg"} // fallback if no image
                width={200}
                height={200}
                alt={item.name}
                onClick={
                  item.name === "Men"
                    ? () => handleMenClicks(item.id)
                    : item.name === "Women"
                    ? () => handleWomenClicks(item.id)
                    : () => router.push(`/product/submenu/${item.id}`)
                }
                className="md:rounded-lg rounded-full w-[80px] md:w-[200px] h-[80px] md:h-[300px] object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
              <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isLoading && LoadingOverlay()}
    </div>
  );
};

export default CategorySlide;

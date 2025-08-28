/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { menuGetAction } from "@/app/redux/action/menu/menuGet";
import { fetchSubmenusAction } from "@/app/redux/action/menu/collection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";

interface SubMenuItem {
  name: string;
  description: string;
  imageUrl: string;
  _id: string;
  productCount?: number; // Add this - API should return this!
}

interface MenuItem {
  name: string;
  subMenus: SubMenuItem[];
  __v: number;
  _id: string;
}

const MenCategorySlide = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"T-Shirt" | "Shirt">("T-Shirt");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Fetch menu once
  useEffect(() => {
    dispatch(menuGetAction());
  }, [dispatch]);

  const menuData = useSelector((state: RootState) => state.menuGet.menu) as MenuItem[];

  // Flatten all submenus
  const submenuData = menuData.flatMap((menu) => menu.subMenus || []);

  // Get T-Shirt and Shirt submenu objects
  const tShirtSubmenu = submenuData.find((submenu) => submenu.name === "T-Shirt");
  const shirtSubmenu = submenuData.find((submenu) => submenu.name === "Shirt");

  // Fetch submenus for the active category
  useEffect(() => {
    if (activeCategory === "T-Shirt" && tShirtSubmenu?._id) {
      dispatch(fetchSubmenusAction(tShirtSubmenu._id));
    } else if (activeCategory === "Shirt" && shirtSubmenu?._id) {
      dispatch(fetchSubmenusAction(shirtSubmenu._id));
    }
  }, [activeCategory, tShirtSubmenu?._id, shirtSubmenu?._id, dispatch]);

  // Get fetched submenus from Redux
  const fetchedSubmenus = useSelector(
    (state: RootState) => Object.values(state.collection.submenus || {})
  );

  // Map fetched submenus to match your UI structure, using productCount
  const dynamicCategories = fetchedSubmenus.map((submenu: any) => ({
    title: submenu.name,
    imageUrl: submenu.imageUrl,
    id: submenu._id,
    hasProducts:
      typeof submenu.productCount === "number"
        ? submenu.productCount > 0
        : false // If optional, fallback is "no products"
  }));

  // Loading overlay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z- flex items-center justify-center opacity-80">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
          <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
          <p className="text-[#535e51] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex justify-center">
      <div className="pb-5 max-w-7xl">
        {/* Category buttons */}
        <div className="flex justify-center gap-4 mt-4 mb-6">
          <button
            onClick={() => setActiveCategory("T-Shirt")}
            className={`px-6 py-2 rounded-md font-semibold ${
              activeCategory === "T-Shirt"
                ? "bg-[#535e51] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tShirtSubmenu?.name || "T-Shirt"}
          </button>
          <button
            onClick={() => setActiveCategory("Shirt")}
            className={`px-6 py-2 rounded-md font-semibold ${
              activeCategory === "Shirt"
                ? "bg-[#535e51] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {shirtSubmenu?.name || "Shirt"}
          </button>
        </div>

        {/* Swiper */}
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
          <div className="flex overflow-x-auto space-x-4 mt-5 md:ps-15 px-3 md:gap-15 scrollbar-hide">
            {dynamicCategories.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center flex-none cursor-pointer`}
              >
                <Image
                  src={item.imageUrl}
                  width={400}
                  height={400}
                  alt={item.title}
                  onClick={() => {
                    if (!item.hasProducts) {
                      alert("No products available under this submenu.");
                      return;
                    }
                    router.push(`/product/submenu/${item.id}`);
                  }}
                  className="md:rounded-lg rounded-[50%] md:w-[150px] w-[80px] md:h-auto h-[80px] object-cover transition-transform duration-300 hover:scale-105"
                />
                <p className="mt-2 text-base sm:text-lg text-[#535e51] font-bold">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default MenCategorySlide;

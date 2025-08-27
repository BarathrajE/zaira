/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Footer from "@/footer/page";
import Header from "@/header/pages";
import Image from "next/image";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MenTreading from "./mencollectionComponents/MenTreading";
import MenCategorySlide from "./mencollectionComponents/mensCategorys";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { homeBannerGetAction } from "../redux/action/banner/homebanner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchGallery } from "../redux/action/mens/gallery";

const MenPages = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
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

  const products = [
    {
      id: 1,
      title: "Printed T-shirts",
      image: "/assets/homeSlide_image/projectimg/t shirt-12.jpg",
      alt: "Man wearing printed t-shirt",
    },
    {
      id: 2,
      title: "Casual Trousers",
      image: "/assets/homeSlide_image/projectimg/t shirt-14.jpg",
      alt: "Casual trousers with wooden chair",
    },
    {
      id: 3,
      title: "Casual Shirts",
      image: "/assets/homeSlide_image/projectimg/t shirt-16.jpg",
      alt: "Man wearing casual shirt",
    },
    {
      id: 4,
      title: "Timeless Fit Denim",
      image: "/assets/homeSlide_image/projectimg/t shirt-38.jpg",
      alt: "Person wearing denim jeans",
    },
  ];

  useEffect(() => {
    dispatch(homeBannerGetAction());
    dispatch(fetchGallery());
  }, [dispatch]);

  const homebanner = useSelector((state: RootState) => state.home.homeBanner);
  const gallery = useSelector((state: RootState) => state.getgallery.gallery);

  const productsFromGallery = gallery
    .filter((item: any) => item.title === "mens gallery" && item.image)
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image,
    }));

  const mainBanners = homebanner
    .filter((banner: any) => banner.title === "men-main-banner" && banner.image)
    .map((banner: any) => ({
      id: banner._id,
      image: banner.image,
      title: banner.title,
    }));

  const offerBanners = homebanner
    .filter((banner: any) => banner.title === "offfer banner" && banner.image)
    .map((banner: any) => ({
      id: banner._id,
      image: banner.image,
      title: banner.title,
    }));

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <Header />

      {/* Main Banner Swiper */}
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
          {mainBanners.map((banner: any) => (
            <SwiperSlide key={banner.id}>
              <Image
                src={banner.image}
                alt={banner.title}
                width={1200}
                height={600}
                className="object-contain w-full h-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1200px"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories & Trending */}
      <section className="pt-4 bg-[#f1f5f4]">
        <MenCategorySlide />
        <MenTreading />
      </section>

      {/* Collections Section */}
      <section>
        <div className="pt-5 bg-[#f1f5f4]">
          <Image
            src="/assets/homeSlide_image/menshop.webp"
            alt="Onam Essentials"
            width={1200}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />

          <div className="py-12 md:px-4 px-2">
            <div className="mx-auto">
              <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
                BY COLLECTION
              </p>
              <div className="flex gap-5 md:gap-8 xl:flex-nowrap xl:overflow-x-hidden overflow-x-auto sm:flex-wrap sm:justify-center px-2 scrollbar-hide scroll-smooth">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className="relative w-[80px] h-[80px] sm:w-[280px] sm:h-[280px] mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-90"></div>
                      <div className="absolute inset-2 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={product.image}
                          alt={product.alt}
                          width={300}
                          height={400}
                        />
                      </div>
                    </div>
                    <h3 className="md:text-lg text-sm text-[#535e51] font-bold text-center">
                      {product.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section>
        <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
          SESSION
        </p>
        {offerBanners.length > 0 ? (
          <Image
            src={offerBanners[0].image}
            alt={offerBanners[0].title}
            width={1200}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Image
            src="/assets/homeSlide_image/offer.jpeg"
            alt="Fallback Banner"
            width={1200}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </section>

      {/* Gallery Section */}
      <section>
        <div className="pt-5 bg-[#f1f5f4]">
          <div className="pt-4 pb-10">
            <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
              FOR THIS SPECIAL
            </p>

            <div className="grid grid-cols-12 gap-4 mt-6">
              {/* Left Side */}
              <div className="col-span-12 md:col-span-6 p-4">
                {/* Dynamic Main Image */}
                {productsFromGallery[0]?.image ? (
                  <Image
                    src={productsFromGallery[0].image}
                    alt={productsFromGallery[0].name || "Gallery Image"}
                    width={500}
                    height={500}
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg mb-4"
                  />
                ) : (
                  // Fallback / Hardcoded Main Image
                  <Image
                    src="/assets/homeSlide_image/projectimg/t shirt-12.jpg"
                    alt="Main T-Shirt Display"
                    width={500}
                    height={500}
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg mb-4"
                  />
                )}

                {/* Dynamic/Static Two Smaller Images */}
                <div className="grid grid-cols-12 gap-4 mt-4">
                  {(productsFromGallery.slice(1, 3).length
                    ? productsFromGallery.slice(1, 3)
                    : [
                        {
                          image:
                            "/assets/homeSlide_image/projectimg/t shirt-28.jpg",
                          name: "Recently Viewed T-Shirt 1",
                          id: "static1",
                        },
                        {
                          image:
                            "/assets/homeSlide_image/projectimg/t shirt-2.jpg",
                          name: "Recently Viewed T-Shirt 2",
                          id: "static2",
                        },
                      ]
                  ).map((item: any, index: number) => (
                    <div key={item.id || index} className="col-span-6 p-2">
                      <Image
                        src={item.image}
                        alt={item.name || "Gallery Image"}
                        width={500}
                        height={500}
                        className="w-full h-[150px] md:h-[200px] object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div className="col-span-12 md:col-span-6 p-4">
                {productsFromGallery[3]?.image ? (
                  <Image
                    src={productsFromGallery[3].image}
                    alt={productsFromGallery[3].name || "Gallery Image"}
                    width={500}
                    height={500}
                    className="w-full h-full max-h-[620px] object-cover rounded-lg"
                  />
                ) : (
                  // Fallback / Hardcoded Right Image
                  <Image
                    src="/assets/homeSlide_image/projectimg/t shirt-6.jpg"
                    alt="Bestseller T-Shirt"
                    width={500}
                    height={500}
                    className="w-full h-full max-h-[620px] object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MenPages;

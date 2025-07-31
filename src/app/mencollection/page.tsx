"use client";
import Footer from "@/footer/page";
import Header from "@/header/pages";
import Image from "next/image";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MenCategorySlide from "../mencollectionComponents/mensCategorys";
import MenTreading from "../mencollectionComponents/MenTreading";

const MenPages = () => {
  const products = [
    {
      id: 1,
      title: "Printed T-shirts",
      image: "/assets/homeSlide_image/treadingmen.webp",
      alt: "Man wearing printed t-shirt",
    },
    {
      id: 2,
      title: "Casual Trousers",
      image: "/assets/homeSlide_image/treadingmen.webp",
      alt: "Casual trousers with wooden chair",
    },
    {
      id: 3,
      title: "Casual Shirts",
      image: "/assets/homeSlide_image/treadingmen.webp",
      alt: "Man wearing casual shirt",
    },
    {
      id: 4,
      title: "Timeless Fit Denim",
      image: "/assets/homeSlide_image/treadingmen.webp",
      alt: "Person wearing denim jeans",
    },
  ];
  return (
    <>
      <Header />
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
              <Image
                src="/assets/homeSlide_image/menShirtcollection.webp"
                alt="Onam Essentials"
                width={1200}
                height={500}
                className="w-full h-full object-cover "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* section category */}

      <section className=" pt-4 bg-[#f1f5f4]">
        <MenCategorySlide />
        <MenTreading />
      </section>

      <section className="pt-5 bg-[#f1f5f4]">
        <Image
          src="/assets/homeSlide_image/menshop.webp"
          alt="Onam Essentials"
          width={1200}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className=" py-12 px-4">
          <div className="max-w-6xl mx-auto ">
            <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
              BY COLLECTION
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Circular Image Container */}
                  <div className="relative w-64 h-64 mb-6">
                    {/* Yellow Border Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-90"></div>

                    {/* Image Container */}
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        width={300}
                        height={400}
                        className=""
                      />
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-lg  text-[#535e51] font-bold text-center">
                    {product.title}
                  </h3>
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
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="pt-4 pb-10">
          <div>
            <p className="text-[#535e51] text-center pb-4 font-bold text-[28px] sm:text-[45px]">
              BY COLLECTION
            </p>

            <div className=" py-12 px-4">
              <div className="max-w-6xl mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      {/* Circular Image Container */}
                      <div className="relative w-64 h-64 mb-6">
                        {/* Yellow Border Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-90"></div>

                        {/* Image Container */}
                        <div className="absolute inset-2 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src={product.image}
                            alt={product.alt}
                            width={300}
                            height={400}
                            className=""
                          />
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-lg  text-[#535e51] font-bold text-center">
                        {product.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
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
          <p className="text-[#535e51] font-bold text-[28px] text-center sm:text-[45px]">
            FOR THIS SPECIAL
          </p>

          <div className="grid grid-cols-12 gap-4 mt-6">
            {/* Left Side */}
            <div className="col-span-12 md:col-span-6 p-4">
              {/* Main Image */}
              <Image
                src="/assets/homeSlide_image/tShirt.webp"
                alt="Main T-Shirt Display"
                width={500}
                height={500}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
              />

              {/* Two smaller images below */}
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 p-2">
                  <Image
                    src="/assets/homeSlide_image/resent_view.webp"
                    alt="Recently Viewed T-Shirt 1"
                    width={500}
                    height={500}
                    className="w-full h-[150px] md:h-[200px] object-cover rounded-md"
                  />
                </div>
                <div className="col-span-6 p-2">
                  <Image
                    src="/assets/homeSlide_image/resent_view.webp"
                    alt="Recently Viewed T-Shirt 2"
                    width={500}
                    height={500}
                    className="w-full h-[150px] md:h-[200px] object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-span-12 md:col-span-6 p-4">
              <Image
                src="/assets/homeSlide_image/bestseller_image.webp"
                alt="Bestseller T-Shirt"
                width={500}
                height={500}
                className="w-full h-full max-h-[620px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MenPages;

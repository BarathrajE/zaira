"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Add useRouter
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmenusAction } from "@/app/redux/action/menu/collection";
import { RootState, AppDispatch } from "@/app/redux/store";
import Image from "next/image";
import Header from "@/header/pages";
import Footer from "@/footer/page";

interface SubmenuItem {
  _id: string;
  name: string;
  imageUrl?: string;
  heading?: string;
  subheading?: string;
  rating?: number;
  price?: string;
  description?: string;
  sizes?: Array<{ size: string; _id: string }>;
}

export default function SubmenusPage() {
  const params = useParams();
  const router = useRouter(); // Initialize the router
  const dispatch = useDispatch<AppDispatch>();
  const submenuId = params?.submenuId as string;
  const submenuData = useSelector((state: RootState) => state.collection.submenus);
  console.log("Redux submenus:", submenuData);

  useEffect(() => {
    if (submenuId) {
      dispatch(fetchSubmenusAction(submenuId));
    }
  }, [submenuId, dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f1f5f4]">
        {/* Header Section */}
        <div className="relative py-16 px-6">
          <div className="absolute inset-0 bg-[#f1f5f4]"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#535e51] mb-4">
              Mens Collection
            </h1>
            <p className="text-[#535e51] text-lg md:text-xl max-w-2xl mx-auto">
              Discover our premium collection of comfortable and stylish
              t-shirts and shirts
            </p>
          </div>
        </div>
        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {submenuData && submenuData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {submenuData.map((sub: SubmenuItem) => (
                <div
                  key={sub._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-[#f1f5f4] h-72">
                    <Image
                      src={sub.imageUrl || "/placeholder.jpg"}
                      alt={sub.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-6 bg-white">
                    {/* Heading & Subheading */}
                    {sub.heading && (
                      <h2 className="text-xl font-bold text-[#535e51] mb-1 line-clamp-1">
                        {sub.heading}
                      </h2>
                    )}
                    {sub.subheading && (
                      <p className="text-[#535e51] text-sm font-medium mb-2">
                        {sub.subheading}
                      </p>
                    )}
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-[#535e51] mb-3 line-clamp-1">
                      {sub.name}
                    </h3>
                    {/* Price and Rating Row */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Price */}
                      {sub.price && (
                        <div className="bg-[#535e51] text-white px-3 py-1 rounded-full font-bold text-sm shadow-md">
                          ₹{sub.price}
                        </div>
                      )}
                      {/* Rating */}
                      {sub.rating && (
                        <div className="bg-[#f1f5f4] text-[#535e51] px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          ⭐ {sub.rating}
                        </div>
                      )}
                    </div>
                    {/* Sizes */}
                    {sub.sizes && sub.sizes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-[#535e51] uppercase tracking-wide font-semibold mb-2">
                          Available Sizes
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {sub.sizes.map((size) => (
                            <span
                              key={size._id}
                              className="px-3 py-1 bg-[#f1f5f4] hover:bg-[#e0e7e5] border border-gray-200 hover:border-[#535e51] rounded-lg text-sm font-medium text-[#535e51] transition-colors cursor-pointer"
                            >
                              {size.size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Action Button */}
                    <button
                      onClick={() => router.push(`/productdisplay/${sub._id}`)}
                      className="w-full bg-[#535e51] hover:bg-[#3a4539] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#f1f5f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-[#535e51]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2-2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-4 0H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#535e51] mb-2">
                No Products Found
              </h3>
              <p className="text-[#535e51]">
                No products found under this submenu category.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

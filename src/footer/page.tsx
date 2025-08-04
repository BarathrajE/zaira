"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  Phone,
  X,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Subscribing email:", email);
    setEmail("");
  };
  return (
    <footer className="">
      <div className=" bg-[#f1f5f4] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className=" flex justify-around flex-wrap gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Stay In Touch
              </h3>
              <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                {/* Instagram */}
                <a href="#" className="flex flex-col items-center group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Instagram className="text-white text-lg sm:text-xl md:text-2xl" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    INSTAGRAM
                  </span>
                </a>

                {/* X */}
                <a href="#" className="flex flex-col items-center group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <X className="text-white text-lg sm:text-xl md:text-2xl" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    X
                  </span>
                </a>

                {/* Facebook */}
                <a href="#" className="flex flex-col items-center group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Facebook className="text-white text-lg sm:text-xl md:text-2xl" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    FACEBOOK
                  </span>
                </a>

                {/* Youtube */}
                <a href="#" className="flex flex-col items-center group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Youtube className="text-white text-lg sm:text-xl md:text-2xl" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    YOUTUBE
                  </span>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl  flex flex-col ">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Talk to us
                </h3>
                <div className="space-y-4">
                  {/* Call Section */}
                  <div className="flex flex-col-reverse lg:flex-row items-center justify-evenly gap-3">
                    <div className="text-center lg:text-right">
                      <div className="font-semibold text-gray-900">CALL</div>
                      <div className="text-sm text-gray-600">
                        1800-103-7527 (10am to 10pm)
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Phone className="text-[#535e51]" />
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="flex flex-col-reverse lg:flex-row items-center justify-evenly gap-3">
                    <div className="text-center lg:text-right">
                      <div className="font-semibold text-gray-900">EMAIL</div>
                      <div className="text-sm text-gray-600">
                        customercare@abrfi.adityabirla.com
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Mail className="text-[#535e51]" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Subscribe to our newsletter
                </h3>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL ADDRESS"
                    className="  px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className=" bg-[#535e51]  text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-[#535e51] py-16 px-6 lg:px-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-[#f1f5f4] uppercase tracking-wide mb-6">
              Customer Service
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-[#f1f5f4]  transition-colors duration-200"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f1f5f4] transition-colors duration-200"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#f1f5f4] uppercase tracking-wide mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-[#f1f5f4] transition-colors duration-200"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f1f5f4] transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f1f5f4] transition-colors duration-200"
                >
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-[#f1f5f4] uppercase tracking-wide mb-6">
              Follow Us
            </h3>

            {/* Email Subscription */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Us"
                  className="flex-1 px-4 py-3 text-sm border border-[#6f746e] rounded-l-md focus:outline-none placeholder-white  "
                />
                <button className="px-4 py-3 bg-[#f1f5f4] text-[#000] rounded-r-md">
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-sm text-[#f1f5f4] mt-3">
                Apply for our free membership to receive exclusive deals, news,
                and events.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="lg:text-right">
            <p className="text-sm text-[#f1f5f4]">© 2025.Zaira</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

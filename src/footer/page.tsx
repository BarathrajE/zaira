"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
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
    <footer className="bg-[#535e51] py-16 px-6 lg:px-12">
      {/* <div className="bg-[#535e51] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Stay In Touch
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
               
                <a href="#" className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Instagram />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    INSTAGRAM
                  </span>
                </a>

                <a href="#" className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <X />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">X</span>
                </a>

               
                <a href="#" className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Facebook />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    FACEBOOK
                  </span>
                </a>

                <a href="#" className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Youtube />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    YOUTUBE
                  </span>
                </a>
              </div>
            </div>


            <div className="bg-white rounded-2xl p-8 shadow-sm col-span-1 lg:col-span-2 flex flex-col justify-between">
             
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center lg:text-right">
                  Talk to us
                </h3>
                <div className="space-y-4">
    
                  <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-3">
                    <div className="text-center lg:text-right">
                      <div className="font-semibold text-gray-900">CALL</div>
                      <div className="text-sm text-gray-600">
                        1800-103-7527 (10am to 10pm)
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>

        
                  <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-3">
                    <div className="text-center lg:text-right">
                      <div className="font-semibold text-gray-900">EMAIL</div>
                      <div className="text-sm text-gray-600">
                        customercare@abrfi.adityabirla.com
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
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
                    className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className=" mx-auto">
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

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Facebook size={18} className="text-[#000]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Instagram size={18} className="text-[#000]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Linkedin size={18} className="text-[#000]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Youtube size={18} className="text-[#000]" />
              </a>
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

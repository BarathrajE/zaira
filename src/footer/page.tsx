import React from 'react';
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#535e51] py-16 px-6 lg:px-12">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-[#f1f5f4] uppercase tracking-wide mb-6">
              Customer Service
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#f1f5f4]  transition-colors duration-200">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#f1f5f4] transition-colors duration-200">
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
                <a href="#" className="text-[#f1f5f4] transition-colors duration-200">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#f1f5f4] transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#f1f5f4] transition-colors duration-200">
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
                  className="flex-1 px-4 py-3 text-sm border border-[#f1f5f4] rounded-l-md focus:outline-none  focus:border-transparent"
                />
                <button className="px-4 py-3 bg-gray-900 text-[#f1f5f4] rounded-r-md hover:bg-gray-800 transition-colors duration-200">
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-sm text-[#f1f5f4] mt-3">
                Apply for our free membership to receive exclusive deals, news, and events.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Facebook size={18} className="text-gray-600" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Instagram size={18} className="text-[#f1f5f4]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Linkedin size={18} className="text-[#f1f5f4]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <Youtube size={18} className="text-[#f1f5f4]" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="lg:text-right">
            <p className="text-sm text-[#f1f5f4]">
              © 2025.Zaira
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
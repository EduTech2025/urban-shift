import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Logo and Contact */}
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <div className="relative w-52 h-24 sm:w-56 sm:h-28 lg:w-60 lg:h-32">
                  <Image
                    src="/assets/logo_footer.jpg"
                    alt="UrbanShift Capital"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
            </div>

            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              <p className="text-white font-semibold">Contact:</p>
              <p className="leading-relaxed">
                Address: Sector XX, Gurugram, Haryana
              </p>
              <p>Phone: +91 9XXXXXXXXX</p>
              <p>Email: hello@yourrealestate.com</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center space-y-4 sm:space-y-6 md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Get weekly market insights
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Join 5,000+ subscribers
              </p>
            </div>

            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Newsletter"
                className="
                  flex-1 px-4 py-3 
                  rounded-full sm:rounded-l-full sm:rounded-r-none
                  bg-[#faf3ee] text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  text-sm sm:text-base
                  placeholder:text-gray-500
                "
              />
              <button
                className="
                bg-slate-700 hover:bg-slate-600 
                px-6 sm:px-8 py-3 
                rounded-full sm:rounded-l-none sm:rounded-r-full
                transition-colors
                text-sm sm:text-base
                font-medium
              "
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Trusted Advisory */}
          <div className="text-center md:text-right space-y-4 md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-base sm:text-lg font-semibold leading-tight">
                YOUR TRUSTED REAL ESTATE ADVISORY
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mt-2">
                Guiding you to better property decisions.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-end gap-3 sm:gap-4">
              <div
                className="
                w-9 h-9 sm:w-10 sm:h-10 
                border border-gray-500 rounded 
                flex items-center justify-center 
                hover:border-white hover:bg-slate-700
                transition-all duration-200
                cursor-pointer
              "
              >
                <FaLinkedinIn size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div
                className="
                w-9 h-9 sm:w-10 sm:h-10 
                border border-gray-500 rounded 
                flex items-center justify-center 
                hover:border-white hover:bg-slate-700
                transition-all duration-200
                cursor-pointer
              "
              >
                <FaFacebookF size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div
                className="
                w-9 h-9 sm:w-10 sm:h-10 
                border border-gray-500 rounded 
                flex items-center justify-center 
                hover:border-white hover:bg-slate-700
                transition-all duration-200
                cursor-pointer
              "
              >
                <FaInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div
                className="
                w-9 h-9 sm:w-10 sm:h-10 
                border border-gray-500 rounded 
                flex items-center justify-center 
                hover:border-white hover:bg-slate-700
                transition-all duration-200
                cursor-pointer
              "
              >
                <FaYoutube size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className="
          flex flex-col sm:flex-row justify-between items-center 
          mt-8 sm:mt-10 lg:mt-12 
          pt-6 sm:pt-8 
          border-t border-gray-700
          gap-4 sm:gap-0
        "
        >
          <p className="text-gray-300 text-sm sm:text-base text-center sm:text-left">
            © 2025 URBANSHIFT CAPITAL
          </p>

          <div className="flex gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base">
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <span className="text-gray-500">•</span>
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-500">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

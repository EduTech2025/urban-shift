import React from "react";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import Image from "next/image";
import { MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Logo & Contact */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-48 h-20 sm:w-56 sm:h-24">
                <Image
                  src="/assets/logo_footer.jpg"
                  alt="UrbanShift Capital"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">
              <p className="font-semibold text-white mb-1">Contact</p>
              <p>2516, DLF Phase 4 Sec 28 , Near Cross Point Mall<br/> Gurugram, Haryana</p>
              <p>Phone: +91 8448212275</p>
              <p>Email: urbanshiftcapital@gmail.com</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center space-y-4 lg:space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Get weekly market insights
              </h3>
              <p className="text-gray-300 text-sm">Join 5,000+ subscribers</p>
            </div>
            <div className="hidden flex flex-col sm:flex-row justify-center items-center w-full max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 w-full px-4 py-2 bg-[#faf3ee] text-gray-800 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-gray-500"
              />
              <button className="bg-slate-700 hover:bg-slate-600 px-6 py-2 text-sm font-medium rounded-full sm:rounded-l-none sm:rounded-r-full transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Trusted Advisory */}
          <div className="text-center md:text-right space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">
                YOUR TRUSTED REAL ESTATE ADVISORY
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                Guiding you to better property decisions.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-end gap-3">
              {[MailIcon, FaFacebookF, FaInstagram].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-500 rounded flex items-center justify-center hover:border-white hover:bg-slate-700 transition-all duration-200 cursor-pointer"
                  >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-300 text-sm sm:text-base">
            © 2025 URBANSHIFT CAPITAL
          </p>
          <div className="flex gap-4 text-gray-300 text-sm sm:text-base">
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

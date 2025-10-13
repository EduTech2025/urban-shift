"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();

  return (
    <div className="relative z-10 flex items-end pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-black/50 justify-center h-full">
      <div className="text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 tracking-wide sm:tracking-wider leading-tight">
          FIND YOUR PROPERTIES
        </h1>

        {/* Responsive Button */}
        <button
          onClick={() => router.push("/about")}
          className="
            bg-blue-800/50 hover:bg-blue-800/70 
            backdrop-blur-sm text-white 
            font-medium 
            py-3 px-8 sm:py-4 sm:px-12 md:px-16 lg:px-20
            w-full sm:w-auto sm:min-w-[280px] md:min-w-[320px] lg:min-w-[384px]
            max-w-sm sm:max-w-md md:max-w-lg
            rounded-full 
            text-sm sm:text-base md:text-lg 
            transition-all duration-200 
            uppercase tracking-wide 
            border border-blue-700/50 
            cursor-pointer
            hover:scale-105 hover:shadow-lg
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          "
        >
          Know More
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section
      className="
        relative 
        h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]
        bg-gradient-to-b from-gray-900 to-gray-700 
        overflow-hidden 
        rounded-lg sm:rounded-xl md:rounded-2xl 
        mx-2 sm:mx-4 lg:mx-6 xl:mx-8
        mt-2 sm:mt-4 lg:mt-6
        shadow-lg sm:shadow-xl
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/landing.jpg"
          alt="Urban landscape"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 90vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <HeroContent />
    </section>
  );
};

export default Hero;

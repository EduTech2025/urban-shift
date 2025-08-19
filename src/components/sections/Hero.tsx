import React from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";

const HeroContent = () => {
  return (
    <div className="relative z-10 flex items-end pb-16 bg-black/50 justify-center h-full">
      <div className="text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider">
          FIND YOUR PROPERTIES
        </h1>
        <button className="bg-blue-800/50 hover:bg-blue-800/70 backdrop-blur-sm text-white w-96 font-medium py-4 px-20 rounded-full text-lg transition-all duration-200 uppercase tracking-wide border border-blue-700/50 cursor-pointer">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[500px] bg-gradient-to-b from-gray-900 to-gray-700 overflow-hidden rounded-2xl mx-4 mt-4">
      {/* Background with city skyline effect */}
      <div className="absolute inset-0">
        <Image
          src="/assets/landing.jpg"
          alt="Urban landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>

      <HeroContent />
    </section>
  );
};

export default Hero;

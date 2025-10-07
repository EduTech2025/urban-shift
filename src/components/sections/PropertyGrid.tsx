"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Property } from "@/types";
import { propertyService } from "@/lib/services/propertyService";
import PropertyCard from "@/components/property/PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const PropertyGrid = () => {
  const router = useRouter();
  const [featuredProperties, setFeaturedProperties] = React.useState<
    Property[]
  >([]);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileHovered, setIsMobileHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch properties and filter featured ones
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allProperties = await propertyService.getAll();

        // Filter only featured properties
        const featured = allProperties.filter(
          (property) => property.is_featured === true
        );
        setFeaturedProperties(featured);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Auto-scroll animation for desktop - FASTER SPEED
  useEffect(() => {
    if (!isHovered && featuredProperties.length > 4) {
      const cardWidth = 25; // 25% of container
      const gap = 1.5; // 1.5rem gap
      const travelDistance =
        featuredProperties.length * (cardWidth + gap) - 100;

      controls.start({
        x: [0, -travelDistance],
        transition: {
          duration: featuredProperties.length * 0.6, // Much faster - reduced from 1.2 to 0.6
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0.2, // Reduced delay
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, isHovered, featuredProperties]);


  // Manual navigation functions for desktop
  const scrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mobile navigation
  const goToNext = () => {
    if (currentIndex < featuredProperties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(featuredProperties.length - 1); // Loop to last
    }
  };

  // Handle view all button click
  const handleViewAll = () => {
    router.push("/featured-properties");
  };

  // Don't render if no featured properties
  if (featuredProperties.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            No featured properties available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover our premium selection of urban properties designed for
            modern living
          </p>
        </div>

        {/* Navigation arrows for larger screens */}
        {featuredProperties.length > 4 && (
          <div className="hidden sm:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 z-30 justify-between pointer-events-none px-4">
            <button
              onClick={scrollLeft}
              className="bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-200 pointer-events-auto cursor-pointer border border-gray-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-200 pointer-events-auto cursor-pointer border border-gray-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        )}

        {/* Carousel */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          {/* Desktop: Continuous scroll */}
          <motion.div className="hidden sm:flex gap-6 py-2" animate={controls}>
            {featuredProperties.map((property) => (
              <div
                key={property.property_id}
                className="min-w-[calc(25%-1.125rem)] max-w-[calc(25%-1.125rem)] flex-shrink-0"
              >
                <PropertyCard
                  property={property}
                />
              </div>
            ))}
          </motion.div>

          {/* Mobile: Enhanced carousel with auto-scroll */}
<div className="sm:hidden relative overflow-x-auto py-4 scrollbar-hide">
  <div className="flex gap-4 px-4">
    {featuredProperties.map((property) => (
      <div
        key={property.property_id}
        className="w-72 flex-shrink-0"
      >
        <PropertyCard property={property} />
      </div>
    ))}
  </div>
</div>

        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Button
            className="w-full sm:w-auto px-8 sm:px-12 bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleViewAll}
          >
            View All Featured Properties
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;

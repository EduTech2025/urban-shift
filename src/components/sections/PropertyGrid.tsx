"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import type { PropertyFilters } from "@/types";
import { propertyFiltersService } from "@/lib/services/propertyFiltersService";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PropertyCard = ({ property }: { property: PropertyFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProperty = async (propertyId: number) => {
    try {
      // Implement save property functionality
      console.log("Saving property:", propertyId);
      // await propertyFiltersService.saveProperty(propertyId);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  return (
    <Card
      hover
      className="group overflow-hidden h-full transition-all duration-300 hover:shadow-xl w-full"
    >
      <CardHeader className="h-40 sm:h-44 md:h-48 lg:h-52 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40 z-10" />
        <Image
          src={property.main_image}
          alt={property.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4 px-3 sm:px-4 lg:px-6 pb-4 sm:pb-5 lg:pb-6 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight line-clamp-2">
          {property.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3 overflow-hidden">
          {property.description}
        </p>
      </CardContent>
    </Card>
  );
};

const PropertyGrid = () => {
  const [properties, setProperties] = React.useState<PropertyFilters[]>([]);
  const [featuredProperties, setFeaturedProperties] = React.useState<
    PropertyFilters[]
  >([]);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation
  useEffect(() => {
    if (!isHovered && featuredProperties.length > 4) {
      controls.start({
        x: [0, -(featuredProperties.length - 4) * (25 + 1.5)], // Move by card width + gap
        transition: {
          duration: featuredProperties.length * 3, // Slower for more properties
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse", // Go back and forth
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, isHovered, featuredProperties]);

  // Fetch properties and filter featured ones
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allProperties = await propertyFiltersService.getAll();
        setProperties(allProperties);

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

  // Manual navigation functions
  const scrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
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
        <div className="hidden sm:flex absolute top-90 left-10 right-10 -translate-y-1/2 z-30 justify-between pointer-events-none">
          <button
            onClick={scrollLeft}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors ml-4 pointer-events-auto cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors mr-4 pointer-events-auto cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Carousel */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          {/* Desktop: 4 items visible, continuous scroll */}
          <motion.div className="hidden sm:flex gap-6" animate={controls}>
            {featuredProperties.map((property, i) => (
              <div
                key={property.property_id}
                className="min-w-[calc(25%-1.125rem)] max-w-[calc(25%-1.125rem)] flex-shrink-0"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </motion.div>

          {/* Mobile: 3 items with middle focus */}
          <div className="flex sm:hidden gap-4 justify-center overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory">
            {featuredProperties.map((property, i) => (
              <div
                key={property.property_id}
                className="snap-center transition-all duration-300 flex-shrink-0 w-[80%] max-w-[300px]"
                style={{
                  transform: `scale(${i === 1 ? 1.05 : 0.9})`,
                  opacity: i === 1 ? 1 : 1,
                }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;

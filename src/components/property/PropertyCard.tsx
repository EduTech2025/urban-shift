"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PropertyFilters } from "@/types";
import PropertyDetailModal from "./PropertyDetailModal";

interface PropertyCardProps {
  property: PropertyFilters;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
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
      // await propertyService.saveProperty(propertyId);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative h-36 sm:h-40 lg:h-48 overflow-hidden">
          <Image
            src={property.main_image}
            alt={property.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Favorite Button */}
          <button
            className="absolute top-3 right-3 z-30 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleSaveProperty(property.property_id);
            }}
          >
            <svg
              className="w-4 h-4 text-gray-600 hover:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-5 lg:p-6">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
            {property.title}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
            {property.subtitle}
          </p>

          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            <p>
              <span className="font-medium">Location:</span> {property.location}
            </p>
            <p>
              <span className="font-medium">Price:</span> ₹{property.price}{" "}
              {property.price_unit}
            </p>
            <p>
              <span className="font-medium">Type:</span> {property.propertyType}
            </p>
            {property.size && (
              <p>
                <span className="font-medium">Size:</span> {property.size}{" "}
                {property.size_unit}
              </p>
            )}
          </div>

          <button className="text-blue-500 text-xs sm:text-sm font-medium hover:text-blue-600 transition-colors flex items-center cursor-pointer">
            Know More →
          </button>
        </div>
      </div>

      <PropertyDetailModal
        property={property}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveProperty={handleSaveProperty}
      />
    </>
  );
};

export default PropertyCard;

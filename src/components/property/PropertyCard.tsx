"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Property } from "@/types";
import { favoriteService } from "@/lib/services/favoriteService";
import { toast } from "sonner";
import { MapPin, Car, Square, Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    property.is_favorite ?? false
  );

  console.log("Property is_favorite:", property);

  const handleCardClick = () => {
    // Navigate to property details page
    router.push(`/property/${property.property_id}`);
  };

  const handleSaveProperty = async (
    propertyId: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      await favoriteService.toggleFavorite(propertyId, isFavorite);
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorite");
    }
  };

  return (
    <div
      className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative h-36 sm:h-40 lg:h-48 overflow-hidden">
        <Image
          src={property.main_image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Favorite Button */}
        <button
          className="absolute top-3 right-3 z-30 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all hover:scale-110"
          onClick={(e) => handleSaveProperty(property.property_id, e)}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
            fill={isFavorite ? "red" : "none"} // fill red if favorite
          />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 z-30">
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
            {property.propertyType}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-30 transform translate-y-7">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {property.availability}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 lg:p-6">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-1">
          {property.title}
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {property.subtitle}
        </p>

        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-indigo-600 font-semibold">
              ₹{property.price.toLocaleString()} {property.price_unit}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {property.bhk_rk}
            </span>
          </div>

          {property.size && (
            <div className="flex items-center">
              <Square className="w-3 h-3 mr-1 text-gray-400" />
              <span>
                {property.size} {property.size_unit}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-xs sm:text-sm font-medium hover:text-blue-600 transition-colors flex items-center cursor-pointer group-hover:translate-x-1 transition-transform">
            View Details →
          </span>

          {property.has_parking_space && (
            <div className="flex items-center text-xs text-gray-500">
              <Car className="w-3 h-3 mr-1" />
              Parking
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Property } from "@/types";
import { favoriteService } from "@/lib/services/favoriteService";
import { propertyService } from "@/lib/services/propertyService";
import { toast } from "sonner";
import { MapPin, Car, Square, Heart, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PropertyCardProps {
  property: Property;
  onDelete?: (propertyId: number) => void; // new prop
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onDelete }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const userData = user?.user || user;
  const [isFavorite, setIsFavorite] = useState<boolean>(
    property.is_favorite ?? false
  );

  const handleCardClick = () => {
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

  const handleEditProperty = (propertyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/admin/properties/edit/${propertyId}`); // Navigate to edit page
  };

  const handleDeleteProperty = async (propertyId: number) => {
    try {
      await propertyService.delete(propertyId);
      toast.success("Property deleted successfully");
      if (onDelete) onDelete(propertyId); // notify parent
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-500/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Delete Property</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{property.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteProperty(property.property_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group relative"
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
              fill={isFavorite ? "red" : "none"}
            />
          </button>

          {/* Admin Buttons: Edit & Delete */}
          {userData?.is_staff && (
            <div className="absolute bottom-3 right-3 flex gap-2 z-30">
              {/* <button
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/properties/edit/${property.property_id}`);
                }}
              >
                <Edit className="w-4 h-4" />
              </button> */}
              <button
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

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
    </>
  );
};

export default PropertyCard;

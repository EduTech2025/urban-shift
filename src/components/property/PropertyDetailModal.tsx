"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Car,
  Home,
  Calendar,
  Ruler,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Bath,
  Bed,
  Square,
  ParkingCircle,
  Maximize2,
  Tag,
  Users,
  Shield,
  Wifi,
  Dumbbell,
  Trees,
  Car as CarIcon,
} from "lucide-react";
import Image from "next/image";
import { PropertyFilters, PropertyDetailModalProps } from "@/types";
import Button from "@/components/ui/Button";

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onSaveProperty,
  isSaved = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);

  if (!isOpen) return null;

  const allImages = [property.main_image, ...(property.show_images || [])];
  const currentImage = allImages[currentImageIndex];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const formatPrice = () => {
    return `₹${property.price.toLocaleString()} ${property.price_unit}`;
  };

  const handleSaveClick = () => {
    if (onSaveProperty) {
      onSaveProperty(property.property_id);
    }
  };

  // Get appropriate icons for different BHK types
  const getBhkIcon = () => {
    if (property.bhk_rk === "RK") return <Home className="w-5 h-5" />;
    return <Bed className="w-5 h-5" />;
  };

  // Mock amenities data - replace with actual data from property
  const amenities = [
    { icon: <Wifi className="w-4 h-4" />, name: "High Speed WiFi" },
    { icon: <Dumbbell className="w-4 h-4" />, name: "Gymnasium" },
    { icon: <Trees className="w-4 h-4" />, name: "Garden Area" },
    { icon: <CarIcon className="w-4 h-4" />, name: "Car Parking" },
    { icon: <Shield className="w-4 h-4" />, name: "24/7 Security" },
    { icon: <Users className="w-4 h-4" />, name: "Community Hall" },
  ];

  return (
    <>
      {/* Enhanced Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-white rounded-2xl sm:rounded-3xl max-w-7xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Compact Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="relative p-4 sm:p-5">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold leading-tight truncate pr-2">
                        {property.title}
                      </h2>
                      <div className="flex items-center text-white/90 mt-1">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {property.location}
                        </span>
                      </div>
                    </div>

                    {property.is_featured && (
                      <div className="bg-amber-400/20 backdrop-blur-sm border border-amber-300/30 px-2 py-1 rounded-full flex items-center flex-shrink-0 ml-2">
                        <Star className="w-3 h-3 mr-1 fill-amber-300 text-amber-300" />
                        <span className="text-xs font-semibold text-amber-100">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Compact Price Display */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <span className="text-lg sm:text-xl font-bold">
                        {formatPrice()}
                      </span>
                    </div>
                    <div className="bg-emerald-500/20 backdrop-blur-sm px-2 py-1 rounded-md">
                      <span className="text-xs font-medium text-emerald-100">
                        {property.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:rotate-90 backdrop-blur-sm flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content with improved scrolling */}
          <div className="overflow-y-auto max-h-[calc(98vh-200px)] sm:max-h-[calc(95vh-220px)] custom-scrollbar">
            {/* Enhanced Image Gallery */}
            <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-gray-100 to-gray-200 group">
              <Image
                src={currentImage}
                alt={property.title}
                fill
                className="object-cover cursor-pointer transition-all duration-500 group-hover:scale-105"
                onClick={() => setIsImageGalleryOpen(true)}
                quality={95}
              />

              {/* Enhanced Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 sm:p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 group"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 sm:p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 group"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white" />
                  </button>
                </>
              )}

              {/* Enhanced Image Counter */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-black/60 text-white px-3 sm:px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/20">
                {currentImageIndex + 1} / {allImages.length}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2 sm:gap-3">
                <button
                  onClick={() => setIsImageGalleryOpen(true)}
                  className="p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md transition-all duration-200 hover:scale-110 border border-white/20"
                >
                  <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  onClick={handleSaveClick}
                  className={`p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 border border-white/20 ${
                    isSaved
                      ? "bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/30"
                      : "bg-black/30 hover:bg-black/50 text-white"
                  }`}
                >
                  <Heart
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill={isSaved ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md transition-all duration-200 hover:scale-110 border border-white/20">
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Enhanced Property Details */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Subtitle with improved typography */}
              <div className="mb-6 sm:mb-8">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                  {property.subtitle}
                </p>
              </div>

              {/* Enhanced Quick Stats with glassmorphism */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <Tag className="w-6 h-6 mr-3 text-indigo-600" />
                  Property Highlights
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                    <div className="flex justify-center items-center mb-3 text-indigo-600 group-hover:scale-110 transition-transform">
                      {getBhkIcon()}
                    </div>
                    <div className="font-bold text-gray-900 text-lg sm:text-xl text-center">
                      {property.bhk_rk}
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      Configuration
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-6 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                    <div className="flex justify-center items-center mb-3 text-emerald-600 group-hover:scale-110 transition-transform">
                      <Square className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-gray-900 text-lg sm:text-xl text-center">
                      {property.size} {property.size_unit}
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      Total Area
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 sm:p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                    <div className="flex justify-center items-center mb-3 text-purple-600 group-hover:scale-110 transition-transform">
                      <ParkingCircle className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-gray-900 text-lg sm:text-xl text-center">
                      {property.has_parking_space ? "Available" : "No"}
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      Parking Space
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                    <div className="flex justify-center items-center mb-3 text-orange-600 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-gray-900 text-lg sm:text-xl text-center">
                      {property.availability}
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      Move-in Ready
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              {property.description && (
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <Home className="w-6 h-6 mr-3 text-indigo-600" />
                    About This Property
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {property.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Features Section */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-indigo-600" />
                  Property Features
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all group">
                      <div className="p-3 bg-blue-100 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <Home className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          Property Type
                        </div>
                        <div className="text-gray-600 capitalize">
                          {property.propertyType}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-md transition-all group">
                      <div className="p-3 bg-emerald-100 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          Prime Location
                        </div>
                        <div className="text-gray-600">{property.location}</div>
                      </div>
                    </div>

                    {property.furnishing && (
                      <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-100 hover:shadow-md transition-all group">
                        <div className="p-3 bg-purple-100 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                          <div className="text-2xl">🛋️</div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">
                            Furnishing Status
                          </div>
                          <div className="text-gray-600 capitalize">
                            {property.furnishing}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-md transition-all group">
                      <div className="p-3 bg-amber-100 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <div className="text-2xl">🏢</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          Sector Location
                        </div>
                        <div className="text-gray-600">
                          {property.in_sector
                            ? "Within Premium Sector"
                            : "Outside Sector"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 hover:shadow-md transition-all group">
                      <div className="p-3 bg-cyan-100 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <Car className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          Parking Facility
                        </div>
                        <div className="text-gray-600">
                          {property.has_parking_space
                            ? "Dedicated Parking Available"
                            : "No Parking Space"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100 hover:shadow-md transition-all group">
                      <div className="p-3 bg-rose-100 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <Calendar className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          Availability Status
                        </div>
                        <div className="text-gray-600">
                          {property.availability}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Amenities Section */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-indigo-600" />
                  Modern Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-100 hover:border-indigo-200 p-4 rounded-xl text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                    >
                      <div className="text-indigo-600 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                        {amenity.icon}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-700">
                        {amenity.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Agent Now
                  </Button>
                  <Button
                    variant="outline"
                    className="py-4 text-lg font-semibold border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Chat
                  </Button>
                </div>

                {/* Enhanced Map Button */}
                {property.location_map && (
                  <Button
                    variant="outline"
                    className="w-full py-4 text-lg font-semibold border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                  >
                    <a
                      href={property.location_map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Explore Location on Map
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Full Screen Image Gallery */}
      {isImageGalleryOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm animate-in fade-in-0 duration-300">
          <div className="relative h-full w-full flex items-center justify-center">
            <Image
              src={currentImage}
              alt={property.title}
              fill
              className="object-contain"
              quality={100}
            />

            <button
              onClick={() => setIsImageGalleryOpen(false)}
              className="absolute top-6 sm:top-8 right-6 sm:right-8 text-white p-3 sm:p-4 bg-black/50 hover:bg-black/70 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-md border border-white/20"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-6 sm:left-8 top-1/2 transform -translate-y-1/2 text-white p-3 sm:p-4 bg-black/50 hover:bg-black/70 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-md border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-6 sm:right-8 top-1/2 transform -translate-y-1/2 text-white p-3 sm:p-4 bg-black/50 hover:bg-black/70 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-md border border-white/20"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 sm:px-6 py-3 rounded-full text-base sm:text-lg backdrop-blur-md border border-white/20">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        @keyframes fade-in-0 {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoom-in-95 {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-in {
          animation: fade-in-0 0.2s ease-out, zoom-in-95 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default PropertyDetailModal;

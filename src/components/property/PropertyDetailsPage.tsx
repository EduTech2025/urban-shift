"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Home,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Square,
  ParkingCircle,
  Maximize2,
  Shield,
  Wifi,
  Dumbbell,
  Trees,
  Car as CarIcon,
  Users,
  CheckCircle,
  Clock,
  Eye,
  X,
  Bath,
  Bed,
} from "lucide-react";
import Image from "next/image";
import { Property } from "@/types";
import Button from "@/components/ui/Button";
import { favoriteService } from "@/lib/services/favoriteService";
import { toast } from "sonner";

interface PropertyDetailsPageProps {
  property: Property;
  onBack?: () => void;
  onSaveProperty?: (propertyId: number) => void;
  isSaved?: boolean;
}

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  onBack,
  onSaveProperty,
  isSaved = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    property.is_favorite ?? false
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allImages = [property.main_image, ...(property.show_image || [])];
  const currentImage = allImages[currentImageIndex];

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

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this amazing ${property.bhk_rk} property in ${property.location}`,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        toast.success("Property shared successfully!");
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Property link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Final fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Property link copied to clipboard!");
      } catch (clipboardError) {
        toast.error("Unable to share property");
      }
    }
  };

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

  const amenities = [
    {
      icon: <Wifi className="w-4 h-4" />,
      name: "WiFi",
      available: true,
    },
    {
      icon: <Dumbbell className="w-4 h-4" />,
      name: "Gym",
      available: true,
    },
    {
      icon: <Trees className="w-4 h-4" />,
      name: "Garden",
      available: true,
    },
    {
      icon: <CarIcon className="w-4 h-4" />,
      name: "Parking",
      available: property.has_parking_space,
    },
    {
      icon: <Shield className="w-4 h-4" />,
      name: "Security",
      available: true,
    },
    {
      icon: <Users className="w-4 h-4" />,
      name: "Community",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf3ee]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="font-semibold text-gray-900">
                  {property.title}
                </h1>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleSaveProperty(property.property_id, e)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "text-red-500 fill-current" : "text-gray-400"
                  }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={currentImage}
                  alt={property.title}
                  fill
                  className="object-cover"
                />

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </>
                )}

                <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>

                <button
                  onClick={() => setIsImageGalleryOpen(true)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex gap-2 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
                          index === currentImageIndex
                            ? "ring-2 ring-gray-900"
                            : "hover:opacity-80"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Overview
              </h2>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Home className="w-5 h-5 mx-auto text-gray-600 mb-1" />
                  <div className="font-medium text-gray-900 text-sm">
                    {property.bhk_rk}
                  </div>
                  <div className="text-xs text-gray-500">Type</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Square className="w-5 h-5 mx-auto text-gray-600 mb-1" />
                  <div className="font-medium text-gray-900 text-sm">
                    {property.size}
                  </div>
                  <div className="text-xs text-gray-500">
                    {property.size_unit}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <ParkingCircle className="w-5 h-5 mx-auto text-gray-600 mb-1" />
                  <div className="font-medium text-gray-900 text-sm">
                    {property.has_parking_space ? "Yes" : "No"}
                  </div>
                  <div className="text-xs text-gray-500">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="text-gray-700 text-sm leading-relaxed">
                {property.description || property.subtitle}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                      amenity.available
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {amenity.icon}
                    <span className="font-medium">{amenity.name}</span>
                    {amenity.available && (
                      <CheckCircle className="w-3 h-3 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium text-gray-900">
                    {property.availability}
                  </span>
                </div>
                {property.furnishing && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Furnishing</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {property.furnishing}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">
                    {property.in_sector ? "In Sector" : "Outside Sector"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-medium text-gray-900">
                    #{property.property_id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center">
                  {property.is_featured && (
                    <div className="inline-flex items-center bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </div>
                  )}

                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatPrice()}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                    <Clock className="w-4 h-4" />
                    <span>{property.availability}</span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 font-medium shadow-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Owner
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 py-3 font-medium"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>

                    {property.location_map && (
                      <Button
                        variant="outline"
                        className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2"
                      >
                        <a
                          href={property.location_map}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          View Map
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Quick Info
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {property.propertyType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area</span>
                    <span className="font-medium text-gray-900">
                      {property.size} {property.size_unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parking</span>
                    <span
                      className={`font-medium ${
                        property.has_parking_space
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {property.has_parking_space
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>
                  {property.furnishing && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnishing</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {property.furnishing}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Location
                </h4>
                <div className="text-sm text-gray-700 mb-3">
                  {property.location}
                </div>
                <div className="text-xs text-gray-500">
                  {property.in_sector
                    ? "Located within sector"
                    : "Outside sector location"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About this Property
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {property.description || property.subtitle}
            </p>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-3 rounded-lg text-center ${
                    amenity.available
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <div className="mb-2">{amenity.icon}</div>
                  <span className="text-xs font-medium">{amenity.name}</span>
                  {amenity.available && (
                    <CheckCircle className="w-3 h-3 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery */}
      {isImageGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95">
          <div className="relative h-full w-full flex items-center justify-center">
            <Image
              src={currentImage}
              alt={property.title}
              fill
              className="object-contain"
            />

            <button
              onClick={() => setIsImageGalleryOpen(false)}
              className="absolute top-4 right-4 text-white p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;

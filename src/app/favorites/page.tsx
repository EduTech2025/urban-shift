"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { favoriteService } from "@/lib/services/favoriteService";
import PropertyCard from "@/components/property/PropertyCard";
import { Property } from "@/types";
import { ArrowLeft, Heart, Search, Filter } from "lucide-react";

const FavoritesPage = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setError(null);
        const favs = await favoriteService.getFavorites();
        setFavorites(favs);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setError("Failed to load your favorite properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleDeleteFavorite = (propertyId: number) => {
    // Remove from favorites state immediately
    setFavorites((prev) => prev.filter((p) => p.property_id !== propertyId));
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Saved Properties
            </h1>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm animate-pulse"
              >
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#faf3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Saved Properties
            </h1>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Saved Properties
            </h1>
          </div>

          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              No saved properties yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring and save properties you're interested in. They'll
              appear here for easy access.
            </p>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Search className="h-4 w-4" />
              Explore Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-[#faf3ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Favourite Properties
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {favorites.length}{" "}
                {favorites.length === 1 ? "property" : "properties"} saved
              </p>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((property) => (
            <PropertyCard
              key={property.property_id}
              property={property}
              onDelete={handleDeleteFavorite}
            />
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Keep exploring to find more properties you love
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;

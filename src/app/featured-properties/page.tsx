// src/app/featured-properties/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/property/PropertyCard";
import { Property } from "@/types";
import { propertyService } from "@/lib/services/propertyService";
import {
  ArrowLeft,
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const FeaturedPropertiesPage = () => {
  const router = useRouter();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default to 12

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setError(null);
        const allProperties = await propertyService.getAll();
        // Filter only featured properties
        const featured = allProperties.filter(
          (property) => property.is_featured === true
        );
        setFeaturedProperties(featured);
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
        setError("Failed to load featured properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // sm breakpoint
        setItemsPerPage(4);
      } else {
        setItemsPerPage(12);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteProperty = (propertyId: number) => {
    setFeaturedProperties((prev) =>
      prev.filter((p) => p.property_id !== propertyId)
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(featuredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = featuredProperties.slice(startIndex, endIndex);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5; // Fewer pages on mobile

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 2) {
        endPage = 3;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
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
              Featured Properties
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
              Featured Properties
            </h1>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-red-500" />
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
  if (featuredProperties.length === 0) {
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
              Featured Properties
            </h1>
          </div>

          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              No featured properties available
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Check back later to see our premium selection of featured
              properties.
            </p>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Search className="h-4 w-4" />
              Explore All Properties
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
                Featured Properties
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {featuredProperties.length}{" "}
                {featuredProperties.length === 1
                  ? "premium property"
                  : "premium properties"}
              </p>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProperties.map((property) => (
            <PropertyCard
              key={property.property_id}
              property={property}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>

        {/* Pagination */}
        {featuredProperties.length > itemsPerPage && (
          <div className="flex justify-center mt-8 sm:mt-12">
            <nav className="flex items-center gap-1 sm:gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" ? setCurrentPage(page) : null
                  }
                  disabled={page === "..."}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : page === "..."
                      ? "border-transparent bg-transparent text-gray-500 cursor-default"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page === "..." ? (
                    <MoreHorizontal className="w-4 h-4" />
                  ) : (
                    page
                  )}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}

        {/* Results info */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, featuredProperties.length)} of{" "}
          {featuredProperties.length} properties
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Discover our curated selection of premium properties
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesPage;

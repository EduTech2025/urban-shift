"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Property } from "@/types";
import { propertyService } from "@/lib/services/propertyService";
import PropertyCard from "@/components/property/PropertyCard";
import { FilterSection } from "@/components/filters/FilterSection";
import { PriceFilter } from "@/components/filters/PriceFilter";
import { LocationFilter } from "@/components/filters/LocationFilter";
import { CheckboxFilter } from "@/components/filters/CheckboxFilter";
import { MobileFiltersModal } from "@/components/filters/MobileFiltersModal";
import { HeaderControls } from "@/components/filters/HeaderControls";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface Filters {
  price: number;
  location: string[];
  propertyType: string[];
  areaSize: number;
  bhk: string[];
  parking: string;
  furnishing: string[];
  availability: string[];
  inSector: string;
}

const PropertyFilterSection = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    price: 50000, // Max price in lakhs
    location: [],
    propertyType: [],
    areaSize: 10000, // Max area size in sq.ft.
    bhk: [],
    parking: "",
    furnishing: [],
    availability: [],
    inSector: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default to 12

  // Options matching your Django model choices
  const propertyTypes = [
    "Residential Apartment",
    "Commercial",
    "Working Space",
    "Rental",
    "Affordables",
  ];

  const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "RK"];
  const furnishingOptions = ["Furnished", "Unfurnished", "Semi-furnished"];
  const availabilityOptions = ["Ready to Move", "Under Construction"];
  const parkingOptions = ["Yes", "No"];
  const sectorOptions = ["Yes", "No", "Any"];

  // Fetch properties and locations
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [propertiesData] = await Promise.all([propertyService.getAll()]);
        setAllProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const handleDeleteProperty = (propertyId: number) => {
    setAllProperties((prev) =>
      prev.filter((p) => p.property_id !== propertyId)
    );
  };

  // Convert price to a common unit (lakhs) for comparison
  const convertToLakhs = (price: number, unit: string): number => {
    switch (unit) {
      case "Crores":
        return price * 100; // 1 crore = 100 lakhs
      case "Thousand":
        return price / 100; // 1000 thousands = 1 lakh
      default: // Lakhs
        return price;
    }
  };

  // Filter properties based on selected filters
  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      // Price filter - convert all to lakhs for comparison
      const propertyPriceInLakhs = convertToLakhs(
        property.price,
        property.price_unit
      );

      if (propertyPriceInLakhs > selectedFilters.price) {
        return false;
      }

      // Location filter (case-insensitive partial match)
      if (selectedFilters.location.length > 0) {
        const propertyLocation = property.location.toLowerCase();
        const hasMatchingLocation = selectedFilters.location.some((loc) =>
          propertyLocation.includes(loc.toLowerCase())
        );
        if (!hasMatchingLocation) {
          return false;
        }
      }

       if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !property.title.toLowerCase().includes(query) &&
        !(property.subtitle && property.subtitle.toLowerCase().includes(query)) &&
        !property.location.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

      // Property type filter
      if (
        selectedFilters.propertyType.length > 0 &&
        !selectedFilters.propertyType.includes(property.propertyType)
      ) {
        return false;
      }

      // Area size filter
      if (property.size && property.size > selectedFilters.areaSize) {
        return false;
      }

      // BHK/RK filter
      if (
        selectedFilters.bhk.length > 0 &&
        !selectedFilters.bhk.includes(property.bhk_rk)
      ) {
        return false;
      }

      // Parking filter
      if (selectedFilters.parking) {
        const hasParking = selectedFilters.parking === "Yes";
        if (property.has_parking_space !== hasParking) {
          return false;
        }
      }

      // Furnishing filter
      if (
        selectedFilters.furnishing.length > 0 &&
        property.furnishing &&
        !selectedFilters.furnishing.includes(property.furnishing)
      ) {
        return false;
      }

      // Availability filter
      if (
        selectedFilters.availability.length > 0 &&
        !selectedFilters.availability.includes(property.availability)
      ) {
        return false;
      }

      // In Sector filter
      if (selectedFilters.inSector && selectedFilters.inSector !== "Any") {
        const inSector = selectedFilters.inSector === "Yes";
        if (property.in_sector !== inSector) {
          return false;
        }
      }

      return true;
    });
  }, [allProperties, selectedFilters,searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

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

  // Filter handlers
  const handlePriceChange = (price: number) => {
    setSelectedFilters((prev) => ({ ...prev, price }));
  };

  const handleAreaSizeChange = (areaSize: number) => {
    setSelectedFilters((prev) => ({ ...prev, areaSize }));
  };

  const handleLocationSelect = (location: string) => {
    if (!selectedFilters.location.includes(location)) {
      setSelectedFilters((prev) => ({
        ...prev,
        location: [...prev.location, location],
      }));
    }
    setLocationSearch("");
    setShowLocationDropdown(false);
  };

  const handleLocationRemove = (locationToRemove: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      location: prev.location.filter((loc) => loc !== locationToRemove),
    }));
  };

  const handleCheckboxChange =
    (filterType: keyof Filters) => (value: string) => {
      setSelectedFilters((prev) => {
        const currentValues = prev[filterType] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];

        return { ...prev, [filterType]: newValues };
      });
    };

  const handleRadioChange = (filterType: keyof Filters) => (value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      price: 50000,
      location: [],
      propertyType: [],
      areaSize: 10000,
      bhk: [],
      parking: "",
      furnishing: [],
      availability: [],
      inSector: "",
    });
  };

  // Get filter counts for UI feedback
  const activeFilterCount = Object.entries(selectedFilters).reduce(
    (count, [key, value]) => {
      if (key === "price" && value !== 500) return count + 1;
      if (key === "areaSize" && value !== 5000) return count + 1;
      if (Array.isArray(value) && value.length > 0) return count + value.length;
      if (typeof value === "string" && value !== "" && value !== "Any")
        return count + 1;
      return count;
    },
    0
  );

  // Filters content component
  const FiltersContent = () => (
    <>
      <PriceFilter
        value={selectedFilters.price}
        onChange={handlePriceChange}
        max={500}
        min={1}
        unit="Lakhs"
      />

      <LocationFilter
        selectedLocations={selectedFilters.location}
        allLocations={allProperties.map((p) => p.location)}
        searchQuery={locationSearch}
        isDropdownOpen={showLocationDropdown}
        onSearchChange={setLocationSearch}
        onLocationSelect={handleLocationSelect}
        onLocationRemove={handleLocationRemove}
        onDropdownToggle={setShowLocationDropdown}
      />

      <CheckboxFilter
        title="Property Type"
        options={propertyTypes}
        selectedValues={selectedFilters.propertyType}
        onValueChange={handleCheckboxChange("propertyType")}
      />

      {/* Area Size Filter */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Maximum Area Size{" "}
          <span className="text-gray-500 text-sm">(sq. ft.)</span>
        </h3>
        <div className="relative mb-4">
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2">
            {selectedFilters.areaSize} sq.ft.
          </span>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={selectedFilters.areaSize}
            onChange={(e) => handleAreaSizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-4"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>100 sq.ft.</span>
          <span>5000+ sq.ft.</span>
        </div>
      </div>

      <CheckboxFilter
        title="BHK/RK Configuration"
        options={bhkOptions}
        selectedValues={selectedFilters.bhk}
        onValueChange={handleCheckboxChange("bhk")}
      />

      {/* Parking Space */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Parking Space</h3>
        <div className="grid grid-cols-3 gap-2">
          {parkingOptions.map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                selectedFilters.parking === option
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <input
                type="radio"
                name="parking"
                className="sr-only"
                value={option}
                checked={selectedFilters.parking === option}
                onChange={() => handleRadioChange("parking")(option)}
              />
              <span>{option}</span>
            </label>
          ))}
          <label
            className={`flex items-center justify-center cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition-colors col-span-3 ${
              selectedFilters.parking === ""
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-indigo-50"
            }`}
          >
            <input
              type="radio"
              name="parking"
              className="sr-only"
              value=""
              checked={selectedFilters.parking === ""}
              onChange={() => handleRadioChange("parking")("")}
            />
            <span>Any</span>
          </label>
        </div>
      </div>

      {/* Furnishing */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Furnishing</h3>
        <CheckboxFilter
          options={furnishingOptions}
          selectedValues={selectedFilters.furnishing}
          onValueChange={handleCheckboxChange("furnishing")}
          title=""
        />
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Availability</h3>
        <CheckboxFilter
          options={availabilityOptions}
          selectedValues={selectedFilters.availability}
          onValueChange={handleCheckboxChange("availability")}
          title=""
        />
      </div>

      {/* In Sector */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">In Sector</h3>
        <div className="grid grid-cols-3 gap-2">
          {sectorOptions.map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                selectedFilters.inSector === option
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <input
                type="radio"
                name="inSector"
                className="sr-only"
                value={option}
                checked={selectedFilters.inSector === option}
                onChange={() => handleRadioChange("inSector")(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Showing {filteredProperties.length} of {allProperties.length}{" "}
          properties
        </p>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-[#faf3ee] m-2 sm:m-4 lg:m-7 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl min-h-screen p-3 sm:p-6 lg:p-10">
      <div className="max-w-10xl mx-auto">
        <HeaderControls
            onMobileFiltersOpen={() => setShowMobileFilters(true)}
            filterCount={activeFilterCount}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        <div className="flex gap-4 sm:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSection
              onClearFilters={clearAllFilters}
              filterCount={activeFilterCount}
            >
              <FiltersContent />
            </FilterSection>
          </div>

          {/* Property Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                {/* Mobile filter summary */}
                <div className="lg:hidden mb-4 p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {filteredProperties.length} properties found
                    </span>
                    <span className="text-sm text-indigo-600">
                      {activeFilterCount} active filters
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {currentProperties.length > 0 ? (
                    currentProperties.map((property) => (
                      <PropertyCard
                        key={property.property_id}
                        property={property}
                        onDelete={handleDeleteProperty}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🏠</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No properties found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your filters to see more results.
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="mt-4 text-indigo-600 hover:text-indigo-700 underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredProperties.length > itemsPerPage && (
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
                            typeof page === "number"
                              ? setCurrentPage(page)
                              : null
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
                  {Math.min(endIndex, filteredProperties.length)} of{" "}
                  {filteredProperties.length} properties
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
      >
        <FiltersContent />
      </MobileFiltersModal>
    </div>
  );
};

export default PropertyFilterSection;

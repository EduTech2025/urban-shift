"use client";

import React, { useState, useEffect } from "react";
import { PropertyFilters } from "@/types";
import { propertyFiltersService } from "@/lib/services/propertyFiltersService";
import { locationService } from "@/lib/services/locationService";
import PropertyCard from "@/components/property/PropertyCard";
import { FilterSection } from "@/components/filters/FilterSection";
import { PriceFilter } from "@/components/filters/PriceFilter";
import { LocationFilter } from "@/components/filters/LocationFilter";
import { CheckboxFilter } from "@/components/filters/CheckboxFilter";
import { MobileFiltersModal } from "@/components/filters/MobileFiltersModal";
import { HeaderControls } from "@/components/filters/HeaderControls";

interface Filters {
  price: number;
  location: string[];
  propertyType: string[];
  areaSize: number;
  bhk: string[];
}

const PropertyFilterSection = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    price: 100,
    location: [],
    propertyType: [],
    areaSize: 100,
    bhk: [],
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [properties, setProperties] = useState<PropertyFilters[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);

  const propertyTypes = [
    "Residential",
    "Commercial",
    "Working Space",
    "Rental",
  ];
  const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK"];
  const furnishingOptions = ["Furnished", "Unfurnished", "Semi-Furnished"];
  const availabilityOptions = ["Ready to Move", "Under Construction"];
  const parkingOptions = ["Yes", "No"];

  // Fetch properties and locations
  useEffect(() => {
    propertyFiltersService.getAll().then(setProperties);
    locationService.getAll().then(setAllLocations);
  }, []);

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

  const clearAllFilters = () => {
    setSelectedFilters({
      price: 100,
      location: [],
      propertyType: [],
      areaSize: 100,
      bhk: [],
    });
  };

  // Filters content component
  const FiltersContent = () => (
    <>
      <PriceFilter value={selectedFilters.price} onChange={handlePriceChange} />

      <LocationFilter
        selectedLocations={selectedFilters.location}
        allLocations={allLocations}
        searchQuery={locationSearch}
        isDropdownOpen={showLocationDropdown}
        onSearchChange={setLocationSearch}
        onLocationSelect={handleLocationSelect}
        onLocationRemove={handleLocationRemove}
        onDropdownToggle={setShowLocationDropdown}
      />

      <CheckboxFilter
        title="Property type"
        options={propertyTypes}
        selectedValues={selectedFilters.propertyType}
        onValueChange={handleCheckboxChange("propertyType")}
        showMore
      />

      {/* Area Size Filter */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Area size{" "}
          <span className="text-gray-500 text-sm">(per meter sq.)</span>
        </h3>
        <div className="relative mb-4">
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2">
            {selectedFilters.areaSize}
          </span>
          <input
            type="range"
            min="0"
            max="200"
            value={selectedFilters.areaSize}
            onChange={(e) => handleAreaSizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-4"
          />
        </div>
      </div>

      <CheckboxFilter
        title="BHK"
        options={bhkOptions}
        selectedValues={selectedFilters.bhk}
        onValueChange={handleCheckboxChange("bhk")}
      />

      {/* Parking Space */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">
          Parking Space
        </h3>
        <div className="flex space-x-4">
          {parkingOptions.map((option, index) => (
            <label
              key={index}
              className="flex-1 flex items-center justify-center cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors"
            >
              <input
                type="radio"
                name="parking"
                className="sr-only"
                value={option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">
          Furnishing
        </h3>
        <CheckboxFilter
          options={furnishingOptions}
          selectedValues={[]}
          onValueChange={() => {}}
          title=""
        />
      </div>

      {/* Availability */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">
          Availability
        </h3>
        <CheckboxFilter
          options={availabilityOptions}
          selectedValues={[]}
          onValueChange={() => {}}
          title=""
        />
      </div>
    </>
  );

  return (
    <div className="bg-[#faf3ee] m-2 sm:m-4 lg:m-7 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl min-h-screen p-3 sm:p-6 lg:p-10">
      <div className="max-w-10xl mx-auto">
        <HeaderControls
          onMobileFiltersOpen={() => setShowMobileFilters(true)}
        />

        <div className="flex gap-4 sm:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSection onClearFilters={clearAllFilters}>
              <FiltersContent />
            </FilterSection>
          </div>

          {/* Property Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.property_id} property={property} />
              ))}
            </div>
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

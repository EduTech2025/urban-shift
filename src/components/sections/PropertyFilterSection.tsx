"use client";

import React, { useState } from "react";
import { ChevronDown, Filter, X, Search } from "lucide-react";

import Image from "next/image";

const PropertyFilterSection = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    price: 100,
    location: [],
    propertyType: [],
    areaSize: 100,
    bhk: [],
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const properties = [
    {
      id: 1,
      image: "/assets/property1.jpg",
      title: "Property name",
      subtitle: "Property name",
      location: "Location:",
      price: "Price:",
      propertyType: "Property type:",
      size: "Size:",
    },
    {
      id: 2,
      image: "/assets/property2.jpg",
      title: "Property name",
      subtitle: "Property name",
      location: "Location:",
      price: "Price:",
      propertyType: "Property type:",
      size: "Size:",
    },
    {
      id: 3,
      image: "/assets/property3.jpg",
      title: "Property name",
      subtitle: "Property name",
      location: "Location:",
      price: "Price:",
      propertyType: "Property type:",
      size: "Size:",
    },
    {
      id: 4,
      image: "/assets/property4.jpg",
      title: "Property name",
      subtitle: "Property name",
      location: "Location:",
      price: "Price:",
      propertyType: "Property type:",
      size: "Size:",
    },
    {
      id: 5,
      image: "/assets/property5.jpg",
      title: "Property name",
      subtitle: "Property name",
      location: "Location:",
      price: "Price:",
      propertyType: "Property type:",
      size: "Size:",
    },
    {
      id: 6,
      image: "/assets/property6.jpg",
      title: "Property name",
      subtitle: "Property name",
      location: "Location:",
      price: "Price:",
      propertyType: "Property type:",
      size: "Size:",
    },
  ];

  const locations = [
    "Gurugram",
    "Gurugram",
    "Gurugram",
    "Gurugram",
    "Gurugram",
    "Gurugram",
  ];
  const propertyTypes = ["Residential", "Commercial"];
  const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK"];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters((prev) => ({
      ...prev,
      price: parseInt(e.target.value),
    }));
  };

  const handleAreaSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters((prev) => ({
      ...prev,
      areaSize: parseInt(e.target.value),
    }));
  };

  const FiltersContent = ({ isMobile = false }) => (
    <div
      className={`
      ${isMobile ? "p-4" : "w-80 lg:w-90 bg-white rounded-2xl p-6 h-fit"}
    `}
    >
      {/* Apply Filter Button */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-3 sm:gap-0">
        <button className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
          <Filter className="w-4 h-4" />
          Apply Filter
        </button>

        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors">
          Clear All
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Price Filter */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Price</h3>
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
            {selectedFilters.price}
          </span>
        </div>
        <div className="mb-2">
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Unit</option>
            <option>Lakhs</option>
            <option>Crores</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="200"
            value={selectedFilters.price}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #4f46e5;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #4f46e5;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
          `}</style>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Location/ Area</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {locations.map((location, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{location}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm hover:underline">
          More options...
        </button>
      </div>

      {/* Property Type Filter */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Property type</h3>
        <div className="space-y-3 mb-3">
          {propertyTypes.map((type, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm hover:underline">
          More options...
        </button>
      </div>

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
            onChange={handleAreaSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-4"
          />
        </div>
      </div>

      {/* BHK Filter */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-4">BHK</h3>
        <div className="grid grid-cols-2 gap-3">
          {bhkOptions.map((bhk, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{bhk}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const MobileFiltersModal = () => {
    if (!showMobileFilters) return null;

    return (
      <div className="lg:hidden fixed inset-0 z-50">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowMobileFilters(false)}
        />

        {/* Modal */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <FiltersContent isMobile />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#faf3ee] m-2 sm:m-4 lg:m-7 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl min-h-screen p-3 sm:p-6 lg:p-10">
      <div className="max-w-10xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 sm:mb-6 gap-4">
          {/* Top Row - Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Sort By Dropdown */}
            <div className="relative">
              <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm">
                <option>Sort By</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Property and Rentals Dropdown */}
            <div className="flex gap-2">
              <div className="relative flex-1 sm:flex-none">
                <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm">
                  <option>Property</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              <div className="relative flex-1 sm:flex-none">
                <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm">
                  <option>Rentals</option>
                  <option>Short Term</option>
                  <option>Long Term</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for..."
              className="bg-white border border-gray-200 rounded-lg pl-4 pr-12 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 rounded-lg p-2">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FiltersContent />
          </div>

          {/* Property Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-36 sm:h-40 lg:h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                      {property.subtitle}
                    </p>

                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                      <p>{property.location}</p>
                      <p>{property.price}</p>
                      <p>{property.propertyType}</p>
                      <p>{property.size}</p>
                    </div>

                    <button className="text-blue-500 text-xs sm:text-sm font-medium hover:text-blue-600 transition-colors flex items-center cursor-pointer">
                      Know More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal />
    </div>
  );
};

export default PropertyFilterSection;

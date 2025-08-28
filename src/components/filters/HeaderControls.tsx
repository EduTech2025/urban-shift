"use client";

import React from "react";
import { ChevronDown, Filter, Search } from "lucide-react";

interface HeaderControlsProps {
  onMobileFiltersOpen: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  onMobileFiltersOpen,
}) => {
  return (
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
          onClick={onMobileFiltersOpen}
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
  );
};

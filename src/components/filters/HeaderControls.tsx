"use client";

import React from "react";
import { ChevronDown, Filter, Search } from "lucide-react";


interface HeaderControlsProps {
  onMobileFiltersOpen: () => void;
  filterCount?: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}


export const HeaderControls: React.FC<HeaderControlsProps> = ({
  onMobileFiltersOpen,
  filterCount = 0,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 sm:mb-6 gap-4">
      {/* Top Row - Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        {/* Sort By Dropdown */}
        {/* <div className="relative">
          <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm">
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div> */}

        {/* Mobile Filter Button */}
        <button
          onClick={onMobileFiltersOpen}
          className="lg:hidden bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors relative"
        >
          <Filter className="w-4 h-4" />
          Filters
          {filterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </button>
      </div>


      {/* Combined Property Dropdown + Search Bar */}
      <div className="flex w-full max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">

        {/* Property Dropdown */}
        <div className="relative">
          <select className="h-full bg-gray-100 border-none pl-3 pr-8 py-2 text-gray-700 text-sm focus:outline-none cursor-pointer">
            <option disabled selected>
              Property
            </option>
            <option>For Sale</option>
            <option>For Rent</option>
          </select>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 h-12 px-4 py-2 text-sm text-gray-700 focus:outline-none"
        />

        {/* Search Button */}
        <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 flex items-center justify-center transition-colors">
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};

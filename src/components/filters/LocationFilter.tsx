"use client";

import React from "react";
import { Search, Plus, MapPin, X } from "lucide-react";

interface LocationFilterProps {
  selectedLocations: string[];
  allLocations: string[];
  searchQuery: string;
  isDropdownOpen: boolean;
  onSearchChange: (query: string) => void;
  onLocationSelect: (location: string) => void;
  onLocationRemove: (location: string) => void;
  onDropdownToggle: (isOpen: boolean) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedLocations,
  allLocations,
  searchQuery,
  isDropdownOpen,
  onSearchChange,
  onLocationSelect,
  onLocationRemove,
  onDropdownToggle,
}) => {
  const filteredLocations = allLocations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-6 sm:mb-8 location-filter-container">
      <h3 className="font-semibold text-gray-900 mb-4">Location/ Area</h3>

      {/* Selected Locations */}
      {selectedLocations.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedLocations.map((location, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full flex items-center gap-1"
            >
              <MapPin className="w-3 h-3" />
              {location}
              <button
                onClick={() => onLocationRemove(location)}
                className="ml-1 text-indigo-600 hover:text-indigo-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Location Search */}
      <div className="relative mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              onDropdownToggle(true);
            }}
            onFocus={() => onDropdownToggle(true)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>

        {/* Location Dropdown */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => onLocationSelect(location)}
                >
                  <span>{location}</span>
                  <Plus className="w-4 h-4 text-gray-500" />
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No locations found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular Locations Quick Select */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-2">Popular locations:</p>
        <div className="flex flex-wrap gap-2">
          {allLocations.slice(0, 4).map((location, index) => (
            <button
              key={index}
              onClick={() => onLocationSelect(location)}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

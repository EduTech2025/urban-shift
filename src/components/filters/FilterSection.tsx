"use client";

import React from "react";
import { Filter, X } from "lucide-react";

interface FilterSectionProps {
  children: React.ReactNode;
  onClearFilters: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  children,
  onClearFilters,
}) => {
  return (
    <div className="w-80 lg:w-90 bg-white rounded-2xl p-6 h-fit">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-3 sm:gap-0">
        <button className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
          <Filter className="w-4 h-4" />
          Apply Filter
        </button>

        <button
          onClick={onClearFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
        >
          Clear All
          <X className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  );
};

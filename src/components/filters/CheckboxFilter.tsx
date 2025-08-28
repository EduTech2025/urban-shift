"use client";

import React from "react";

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onValueChange: (value: string) => void;
  showMore?: boolean;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  title,
  options,
  selectedValues,
  onValueChange,
  showMore = false,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3 mb-3">
        {options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => onValueChange(option)}
              className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {showMore && (
        <button className="text-blue-500 text-sm hover:underline">
          More options...
        </button>
      )}
    </div>
  );
};

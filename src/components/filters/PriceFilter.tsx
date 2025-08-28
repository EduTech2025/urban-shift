"use client";

import React from "react";

interface PriceFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Price</h3>
        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
          ₹{value} {value >= 100 ? "Lakhs+" : "Lakhs"}
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
          min="20"
          max="500"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
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
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>₹20L</span>
        <span>₹5Cr+</span>
      </div>
    </div>
  );
};

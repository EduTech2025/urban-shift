interface PriceFilterProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  min: number;
  unit: string; // Add unit prop
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
  max,
  min,
  unit, // Destructure unit
}) => {
  const formatPrice = (price: number) => {
    // Use the provided unit for formatting
    if (unit === "Crores") {
      return `₹${price} Crore+`;
    } else if (unit === "Thousand") {
      return `₹${price} Thousand+`;
    } else {
      // Default to Lakhs
      return `₹${price} Lakhs+`;
    }
  };

  // Format the min and max values based on unit
  const formatLimitValue = (val: number, isMin: boolean = true) => {
    if (unit === "Crores") {
      return `₹${val} Cr${isMin ? "" : "+"}`;
    } else if (unit === "Thousand") {
      return `₹${val}K${isMin ? "" : "+"}`;
    } else {
      return `₹${val}L${isMin ? "" : "+"}`;
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Max Price</h3>
        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
          {formatPrice(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
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
        <span>{formatLimitValue(min)}</span>
        <span>{formatLimitValue(max, false)}</span>
      </div>
    </div>
  );
};

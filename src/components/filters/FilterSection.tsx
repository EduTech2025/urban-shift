interface FilterSectionProps {
  children: React.ReactNode;
  onClearFilters: () => void;
  filterCount?: number;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  children,
  onClearFilters,
  filterCount = 0,
}) => {
  return (
    <div className="w-80 lg:w-90 bg-white rounded-2xl p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Filters {filterCount > 0 && `(${filterCount})`}
        </h2>
        <button
          onClick={onClearFilters}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          Clear All
        </button>
      </div>
      {children}
    </div>
  );
};

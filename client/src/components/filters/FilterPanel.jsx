import { useState, useEffect } from "react";
import { Filter, Search, RotateCcw, ChevronDown } from "lucide-react";
import { useFilterOptions } from "../../hooks/useDashboardData";

export default function FilterPanel({ filters, setFilters }) {
  const { options, loading } = useFilterOptions();
  const [tempFilters, setTempFilters] = useState(filters);

  // Sync tempFilters with filters when they are reset externally
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setFilters(tempFilters);
  };

  const handleReset = () => {
    setTempFilters({});
    setFilters({});
  };

  const selectClasses =
    "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer";

  const FilterGroup = ({ label, field, placeholder, icon: Icon }) => (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
        <Icon size={16} />
      </div>
      <select
        value={tempFilters[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`${selectClasses} pl-10 pr-10`}
      >
        <option value="">{placeholder}</option>
        {options[field]?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <ChevronDown size={16} />
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Filter size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Filters
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Refine your data view
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm font-semibold"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all text-sm font-semibold"
          >
            <Search size={16} />
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">Topic</label>
          <FilterGroup field="topic" placeholder="Select Topic" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">Region</label>
          <FilterGroup field="region" placeholder="Select Region" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">Country</label>
          <FilterGroup field="country" placeholder="Select Country" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">Sector</label>
          <FilterGroup field="sector" placeholder="Select Sector" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">PESTLE</label>
          <FilterGroup field="pestle" placeholder="Select PESTLE" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">Source</label>
          <FilterGroup field="source" placeholder="Select Source" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">End Year</label>
          <FilterGroup field="end_year" placeholder="Select Year" icon={Search} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase px-1">City</label>
          <FilterGroup field="city" placeholder="Select City" icon={Search} />
        </div>
      </div>
    </div>
  );
}

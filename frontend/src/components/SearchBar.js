import React, { useState, useEffect, useRef } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onFiltersChange,
  placeholder = "Search movies...",
  showFilters = false,
  className = "",
  autoFocus = false
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxRating: 5,
    yearFrom: 1900,
    yearTo: new Date().getFullYear(),
    genre: ''
  });
  
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Sync local state with prop
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  // Handle search with debouncing
  const handleSearchChange = (value) => {
    setLocalSearchTerm(value);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer for debouncing
    debounceTimer.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(newFilters);
    
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const resetFilters = {
      minRating: 0,
      maxRating: 5,
      yearFrom: 1900,
      yearTo: new Date().getFullYear(),
      genre: ''
    };
    setFilters(resetFilters);
    
    if (onFiltersChange) {
      onFiltersChange(resetFilters);
    }
  };

  const hasActiveFilters = filters.minRating > 0 || 
                          filters.maxRating < 5 || 
                          filters.yearFrom > 1900 || 
                          filters.yearTo < new Date().getFullYear() || 
                          filters.genre !== '';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${
            className.includes('header') ? 'text-purple-400' : 'text-gray-400'
          }`} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={localSearchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={`block w-full pl-10 pr-20 py-3 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
            className.includes('header')
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-600 bg-gray-700'
          }`}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        
        {/* Search Actions */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {localSearchTerm && (
            <button
              onClick={handleClearSearch}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-600"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          
          {showFilters && (
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-1 rounded-full transition-colors ${
                showAdvancedFilters || hasActiveFilters
                  ? 'text-purple-400 bg-purple-600 bg-opacity-20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-600'
              }`}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && showAdvancedFilters && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Advanced Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rating Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {[0, 1, 2, 3, 4].map(rating => (
                    <option key={rating} value={rating}>
                      {rating === 0 ? 'Any' : `${rating}+ Stars`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Rating
                </label>
                <select
                  value={filters.maxRating}
                  onChange={(e) => handleFilterChange('maxRating', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>
                      {rating === 5 ? 'Any' : `Up to ${rating} Stars`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  From Year
                </label>
                <input
                  type="number"
                  value={filters.yearFrom}
                  onChange={(e) => handleFilterChange('yearFrom', parseInt(e.target.value) || 1900)}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  To Year
                </label>
                <input
                  type="number"
                  value={filters.yearTo}
                  onChange={(e) => handleFilterChange('yearTo', parseInt(e.target.value) || new Date().getFullYear())}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Genre Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Genre
            </label>
            <input
              type="text"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Filter by genre..."
            />
          </div>
        </div>
      )}

      {/* Search Tips */}
      {!localSearchTerm && (
        <div className="text-sm text-gray-400">
          <p>💡 Search tips: Use titles, director names, or genres</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { PRICE_RANGES, ROOM_TYPES, GENDER_POLICIES, PROPERTY_TYPES, AMENITIES } from '../lib/data';

interface PropertyFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ 
  onFilterChange, 
  activeFilters 
}) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleExpandSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handlePriceRangeChange = (range: { min: number, max: number }) => {
    onFilterChange({ 
      ...activeFilters, 
      priceRange: { min: range.min, max: range.max } 
    });
  };

  const handleRoomTypeChange = (type: string) => {
    const updatedRoomTypes = activeFilters.roomTypes.includes(type)
      ? activeFilters.roomTypes.filter((t: string) => t !== type)
      : [...activeFilters.roomTypes, type];
    
    onFilterChange({ ...activeFilters, roomTypes: updatedRoomTypes });
  };

  const handleGenderPolicyChange = (policy: string) => {
    const updatedPolicies = activeFilters.genderPolicies.includes(policy)
      ? activeFilters.genderPolicies.filter((p: string) => p !== policy)
      : [...activeFilters.genderPolicies, policy];
    
    onFilterChange({ ...activeFilters, genderPolicies: updatedPolicies });
  };

  const handlePropertyTypeChange = (type: string) => {
    const updatedTypes = activeFilters.propertyTypes.includes(type)
      ? activeFilters.propertyTypes.filter((t: string) => t !== type)
      : [...activeFilters.propertyTypes, type];
    
    onFilterChange({ ...activeFilters, propertyTypes: updatedTypes });
  };

  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = activeFilters.amenities.includes(amenity)
      ? activeFilters.amenities.filter((a: string) => a !== amenity)
      : [...activeFilters.amenities, amenity];
    
    onFilterChange({ ...activeFilters, amenities: updatedAmenities });
  };

  const handleClearFilters = () => {
    onFilterChange({
      priceRange: { min: 0, max: 10000 },
      roomTypes: [],
      genderPolicies: [],
      propertyTypes: [],
      amenities: []
    });
  };

  const getActiveFilterCount = () => {
    return (
      (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 10000 ? 1 : 0) +
      activeFilters.roomTypes.length +
      activeFilters.genderPolicies.length +
      activeFilters.propertyTypes.length +
      activeFilters.amenities.length
    );
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5">
                {activeFilterCount}
              </div>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear all</span>
            </button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="p-5 border-b border-gray-100">
        <div className="space-y-4">
          {/* Price Range */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left mb-2"
              onClick={() => handleExpandSection('price')}
            >
              <span className="font-medium text-sm">Price Range</span>
              {expandedSection === 'price' ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'price' && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.label}
                    className={`text-sm py-2 px-3 rounded-lg border transition-colors ${
                      activeFilters.priceRange.min === range.min && activeFilters.priceRange.max === range.max
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : 'border-gray-200 text-muted-foreground hover:border-primary/30'
                    }`}
                    onClick={() => handlePriceRangeChange(range)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Room Type */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left mb-2"
              onClick={() => handleExpandSection('roomType')}
            >
              <span className="font-medium text-sm">Room Type</span>
              {expandedSection === 'roomType' ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'roomType' && (
              <div className="mt-2 space-y-2">
                {ROOM_TYPES.map((type) => (
                  <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={activeFilters.roomTypes.includes(type.id)}
                      onChange={() => handleRoomTypeChange(type.id)}
                    />
                    <span className="text-sm text-muted-foreground">{type.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Gender Policy */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left mb-2"
              onClick={() => handleExpandSection('genderPolicy')}
            >
              <span className="font-medium text-sm">Gender Policy</span>
              {expandedSection === 'genderPolicy' ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'genderPolicy' && (
              <div className="mt-2 space-y-2">
                {GENDER_POLICIES.map((policy) => (
                  <label key={policy.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={activeFilters.genderPolicies.includes(policy.id)}
                      onChange={() => handleGenderPolicyChange(policy.id)}
                    />
                    <span className="text-sm text-muted-foreground">{policy.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More Filters Toggle */}
      <div className="px-5 py-3 text-center">
        <button 
          className="text-sm font-medium text-primary flex items-center justify-center space-x-1 mx-auto"
          onClick={() => setShowMoreFilters(!showMoreFilters)}
        >
          <span>{showMoreFilters ? 'Show Less' : 'More Filters'}</span>
          {showMoreFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {showMoreFilters && (
        <div className="border-t border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <div className="space-y-4">
              {/* Property Type */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-left mb-2"
                  onClick={() => handleExpandSection('propertyType')}
                >
                  <span className="font-medium text-sm">Property Type</span>
                  {expandedSection === 'propertyType' ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                
                {expandedSection === 'propertyType' && (
                  <div className="mt-2 space-y-2">
                    {PROPERTY_TYPES.map((type) => (
                      <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={activeFilters.propertyTypes.includes(type.id)}
                          onChange={() => handlePropertyTypeChange(type.id)}
                        />
                        <span className="text-sm text-muted-foreground">{type.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-left mb-2"
                  onClick={() => handleExpandSection('amenities')}
                >
                  <span className="font-medium text-sm">Amenities</span>
                  {expandedSection === 'amenities' ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                
                {expandedSection === 'amenities' && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {AMENITIES.map((amenity) => (
                      <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={activeFilters.amenities.includes(amenity.id)}
                          onChange={() => handleAmenityChange(amenity.id)}
                        />
                        <span className="text-sm text-muted-foreground">{amenity.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;

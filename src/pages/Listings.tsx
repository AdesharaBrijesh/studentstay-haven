
import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Footer from '../components/Footer';
import { useProperties } from '../hooks/useProperties';
import { FilterOptions } from '../lib/types';

const Listings = () => {
  const { data: properties = [], isLoading, error } = useProperties();
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50000],
    roomTypes: [],
    genderPolicy: [],
    amenities: [],
    location: ''
  });

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Apply filters
  const filteredProperties = properties.filter(property => {
    // Price filter
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }

    // Room type filter
    if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(property.roomDetails.roomType)) {
      return false;
    }

    // Gender policy filter
    if (filters.genderPolicy.length > 0 && !filters.genderPolicy.includes(property.roomDetails.genderPolicy)) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    // Location filter
    if (filters.location && !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) && 
        !property.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    return true;
  });

  if (error) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Properties</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <PropertyFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Available Properties
              </h1>
              <p className="text-gray-600">
                {isLoading ? 'Loading...' : `${filteredProperties.length} properties found`}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Listings;

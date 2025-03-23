
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, ArrowUpDown, List, Grid, Map as MapIcon, Home, GitCompare } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Map from '../components/Map';
import Footer from '../components/Footer';
import { PROPERTIES } from '../lib/data';
import { Property } from '../lib/types';
import { useCompare } from '../lib/CompareContext';

const Listings = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(PROPERTIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('Ahmedabad, Gujarat');
  const [showMap, setShowMap] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [sortOption, setSortOption] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    roomTypes: [] as string[],
    genderPolicies: [] as string[],
    propertyTypes: [] as string[],
    amenities: [] as string[]
  });
  
  const { compareList } = useCompare();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Extract search params from navigation state
  useEffect(() => {
    if (location.state) {
      const { searchTerm, location: locationParam } = location.state as any;
      if (searchTerm) setSearchTerm(searchTerm);
      if (locationParam) setSearchLocation(locationParam);
    }
  }, [location.state]);

  // Apply filters
  useEffect(() => {
    let filtered = PROPERTIES;
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((property) => 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply location filter
    if (searchLocation && searchLocation !== 'Ahmedabad, Gujarat') {
      filtered = filtered.filter((property) => 
        property.location.city.toLowerCase() === searchLocation.split(',')[0].toLowerCase()
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter((property) => 
      property.price >= filters.priceRange.min && property.price <= filters.priceRange.max
    );
    
    // Apply room type filter
    if (filters.roomTypes.length > 0) {
      filtered = filtered.filter((property) => 
        filters.roomTypes.includes(property.roomDetails.roomType)
      );
    }
    
    // Apply gender policy filter
    if (filters.genderPolicies.length > 0) {
      filtered = filtered.filter((property) => 
        filters.genderPolicies.includes(property.roomDetails.genderPolicy)
      );
    }
    
    // Apply property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter((property) => 
        filters.propertyTypes.includes(property.type)
      );
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((property) => 
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }
    
    // Apply sorting
    if (sortOption === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    setFilteredProperties(filtered);
  }, [searchTerm, searchLocation, filters, sortOption]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to results
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Search Header */}
      <div className="bg-primary/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Accommodation</h1>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow w-full md:w-auto">
              <div className="flex items-center border bg-white border-input rounded-lg overflow-hidden shadow-sm hover:border-primary transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
                <div className="pl-4 pr-2 py-3 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <select
                  className="w-full bg-transparent border-0 focus:ring-0 appearance-none text-foreground py-3 pr-4 cursor-pointer"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                >
                  <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
                  <option value="Gandhinagar, Gujarat">Gandhinagar, Gujarat</option>
                </select>
              </div>
            </div>
            
            <div className="relative flex-grow w-full md:flex-1">
              <div className="flex items-center border bg-white border-input rounded-lg overflow-hidden shadow-sm hover:border-primary transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
                <div className="pl-4 pr-2 py-3 flex-shrink-0">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="PG, hostel, or area..."
                  className="w-full border-0 focus:ring-0 text-foreground py-3 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg py-3 px-6 shadow-sm transition-all hover:shadow w-full md:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={resultsRef}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProperties.length} Properties {searchLocation && `in ${searchLocation}`}
          </h2>
          
          <div className="flex items-center flex-wrap gap-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
            </div>
            
            <div className="flex items-center space-x-1 border border-gray-200 rounded-lg">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 ${isGridView ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 ${!isGridView ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center space-x-1 text-sm font-medium p-2 rounded-lg border ${
                showMap 
                  ? 'bg-primary/10 border-primary/30 text-primary' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapIcon className="h-4 w-4" />
              <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
            </button>
            
            {compareList.length > 0 && (
              <div className="hidden md:block text-sm">
                <span className="font-medium">{compareList.length}</span> properties in comparison
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <PropertyFilters
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>
          
          {/* Properties Grid/List */}
          <div className="flex-grow">
            {showMap && (
              <div className="h-[400px] mb-8 rounded-xl overflow-hidden">
                <Map
                  coordinates={[23.0225, 72.5714]} // Ahmedabad coordinates
                  markers={filteredProperties.map(p => ({
                    coordinates: p.location.coordinates,
                    title: p.name
                  }))}
                />
              </div>
            )}
            
            {compareList.length > 0 && (
              <div className="mb-4 md:hidden flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                <div className="flex items-center">
                  <GitCompare className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">
                    <span className="font-medium">{compareList.length}</span> properties in comparison
                  </span>
                </div>
              </div>
            )}
            
            {filteredProperties.length > 0 ? (
              <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    featured={!isGridView} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
                </p>
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

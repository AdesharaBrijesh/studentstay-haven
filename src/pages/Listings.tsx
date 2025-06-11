import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { Property } from '../lib/types';
import { supabase } from '@/integrations/supabase/client';

const Listings = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    roomTypes: [],
    genderPolicy: [],
    amenities: [],
    location: '',
  });

  useEffect(() => {
    // Extract search term and location from the location state
    if (location.state) {
      setSearchTerm(location.state.searchTerm || '');
      setPropertyLocation(location.state.location || '');
    }
    fetchProperties();
  }, [location.state]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('properties')
        .select(`
          *,
          property_locations(*),
          room_details(*),
          contact_info(*)
        `)
        .eq('status', 'approved'); // Only fetch approved properties

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (propertyLocation) {
        query = query.ilike('property_locations.city', `%${propertyLocation}%`);
      }

      // Apply filters
      if (filters.priceRange) {
        query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
      }
      if (filters.roomTypes && filters.roomTypes.length > 0) {
        query = query.in('room_details.room_type', filters.roomTypes);
      }
      if (filters.genderPolicy && filters.genderPolicy.length > 0) {
        query = query.in('room_details.gender_policy', filters.genderPolicy);
      }
      // Add more filters as needed

      const { data, error } = await query;

      if (error) throw error;

      // Map the data to the Property interface
      const mappedProperties: Property[] = data.map((property: any) => ({
        id: property.id,
        name: property.name,
        description: property.description,
        type: property.type,
        price: property.price,
        location: {
          address: property.property_locations[0]?.address || '',
          city: property.property_locations[0]?.city || '',
          state: property.property_locations[0]?.state || '',
          zipCode: property.property_locations[0]?.zip_code || '',
          coordinates: [0, 0], // You might need to fetch coordinates separately
        },
        roomDetails: {
          roomType: property.room_details[0]?.room_type || 'private',
          bedrooms: property.room_details[0]?.bedrooms || 1,
          bathrooms: property.room_details[0]?.bathrooms || 1,
          genderPolicy: property.room_details[0]?.gender_policy || 'co-ed',
          maxOccupancy: property.room_details[0]?.max_occupancy || 1,
          roomSize: property.room_details[0]?.room_size || 100,
        },
        amenities: [], // Replace with actual amenities data if available
        rules: [], // Replace with actual rules data if available
        photos: [], // Replace with actual photos data if available
        contactInfo: {
          name: property.contact_info[0]?.name || '',
          email: property.contact_info[0]?.email || '',
          phone: property.contact_info[0]?.phone || '',
        },
      }));

      setProperties(mappedProperties);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <PropertyFilters onFilterChange={handleFiltersChange} />
            </div>
          </aside>

          <main className="flex-grow">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">
              {searchTerm || propertyLocation ? 'Search Results' : 'Available Listings'}
            </h1>
            {loading ? (
              <div className="text-center">Loading properties...</div>
            ) : properties.length === 0 ? (
              <div className="text-center">
                No properties found matching your criteria.
                <Link to="/" className="text-primary hover:underline block mt-4">
                  Clear Search and Browse All Listings
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listings;

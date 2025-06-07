
import React from 'react';
import ListingForm from '../components/ListingForm';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PropertyFormData } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

const AddListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast.error('You must be logged in to add a listing');
      navigate('/auth');
      return;
    }

    try {
      console.log('Submitting property data:', data);

      // Create the main property record
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          name: data.name,
          type: data.type,
          price: parseInt(data.price),
          description: data.description,
          owner_id: user.id
        })
        .select()
        .single();

      if (propertyError) {
        console.error('Property creation error:', propertyError);
        throw propertyError;
      }

      console.log('Property created:', property);

      // Create location record
      const { error: locationError } = await supabase
        .from('property_locations')
        .insert({
          property_id: property.id,
          address: data.location.address,
          city: data.location.city,
          state: data.location.state,
          zip_code: data.location.zipCode
        });

      if (locationError) {
        console.error('Location creation error:', locationError);
        throw locationError;
      }

      // Create room details record
      const { error: roomError } = await supabase
        .from('room_details')
        .insert({
          property_id: property.id,
          room_type: data.roomDetails.roomType,
          bedrooms: parseInt(data.roomDetails.bedrooms),
          bathrooms: parseInt(data.roomDetails.bathrooms),
          gender_policy: data.roomDetails.genderPolicy,
          max_occupancy: parseInt(data.roomDetails.maxOccupancy),
          room_size: parseInt(data.roomDetails.roomSize)
        });

      if (roomError) {
        console.error('Room details creation error:', roomError);
        throw roomError;
      }

      // Create contact info record
      const { error: contactError } = await supabase
        .from('contact_info')
        .insert({
          property_id: property.id,
          name: data.contactInfo.name,
          email: data.contactInfo.email,
          phone: data.contactInfo.phone
        });

      if (contactError) {
        console.error('Contact info creation error:', contactError);
        throw contactError;
      }

      // Create amenities associations
      if (data.amenities.length > 0) {
        const { data: amenitiesData, error: amenitiesError } = await supabase
          .from('amenities')
          .select('id, name')
          .in('name', data.amenities);

        if (amenitiesError) {
          console.error('Amenities fetch error:', amenitiesError);
          throw amenitiesError;
        }

        const propertyAmenities = amenitiesData.map(amenity => ({
          property_id: property.id,
          amenity_id: amenity.id
        }));

        const { error: propertyAmenitiesError } = await supabase
          .from('property_amenities')
          .insert(propertyAmenities);

        if (propertyAmenitiesError) {
          console.error('Property amenities creation error:', propertyAmenitiesError);
          throw propertyAmenitiesError;
        }
      }

      // Create rules
      if (data.rules.length > 0) {
        const rules = data.rules.map((rule, index) => ({
          property_id: property.id,
          rule: rule,
          display_order: index
        }));

        const { error: rulesError } = await supabase
          .from('property_rules')
          .insert(rules);

        if (rulesError) {
          console.error('Rules creation error:', rulesError);
          throw rulesError;
        }
      }

      // Handle photo uploads (for now, we'll store placeholder URLs)
      if (data.photos.length > 0) {
        const photoRecords = data.photos.map((photo, index) => ({
          property_id: property.id,
          url: '/placeholder.svg', // In a real app, you'd upload to storage first
          is_primary: index === 0,
          display_order: index
        }));

        const { error: photosError } = await supabase
          .from('property_photos')
          .insert(photoRecords);

        if (photosError) {
          console.error('Photos creation error:', photosError);
          throw photosError;
        }
      } else {
        // Add a default placeholder photo
        const { error: photosError } = await supabase
          .from('property_photos')
          .insert({
            property_id: property.id,
            url: '/placeholder.svg',
            is_primary: true,
            display_order: 0
          });

        if (photosError) {
          console.error('Default photo creation error:', photosError);
          throw photosError;
        }
      }

      toast.success('Property listing created successfully!');
      navigate('/listings');
    } catch (error) {
      console.error('Failed to create property listing:', error);
      toast.error('Failed to create property listing. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Add your PG, hostel, or rental accommodation to our platform and connect with thousands of people looking for a place to stay in Ahmedabad
          </p>
        </div>
        
        <ListingForm onSubmit={handleSubmit} />
      </div>
      
      <Footer />
    </div>
  );
};

export default AddListing;

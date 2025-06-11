
import React from 'react';
import ListingForm from '../components/ListingForm';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { PropertyFormData } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: PropertyFormData) => {
    console.log('Form submitted:', data);
    
    if (!user) {
      toast.error('Please login to submit a listing');
      navigate('/auth');
      return;
    }

    try {
      // Insert property with pending status
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          name: data.name,
          type: data.type as 'pg' | 'hostel' | 'shared-apartment' | 'single-room' | 'dormitory' | 'student-housing',
          price: parseInt(data.price),
          description: data.description,
          owner_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Insert property location
      const { error: locationError } = await supabase
        .from('property_locations')
        .insert({
          property_id: property.id,
          address: data.location.address,
          city: data.location.city,
          state: data.location.state,
          zip_code: data.location.zipCode,
          latitude: 23.0225, // Default coordinates for Ahmedabad
          longitude: 72.5714
        });

      if (locationError) throw locationError;

      // Insert room details
      const { error: roomError } = await supabase
        .from('room_details')
        .insert({
          property_id: property.id,
          room_type: data.roomDetails.roomType as 'private' | 'shared' | 'studio',
          bedrooms: parseInt(data.roomDetails.bedrooms),
          bathrooms: parseInt(data.roomDetails.bathrooms),
          gender_policy: data.roomDetails.genderPolicy as 'male' | 'female' | 'co-ed',
          max_occupancy: parseInt(data.roomDetails.maxOccupancy),
          room_size: parseInt(data.roomDetails.roomSize)
        });

      if (roomError) throw roomError;

      // Insert contact info
      const { error: contactError } = await supabase
        .from('contact_info')
        .insert({
          property_id: property.id,
          name: data.contactInfo.name,
          email: data.contactInfo.email,
          phone: data.contactInfo.phone
        });

      if (contactError) throw contactError;

      // Insert property rules
      if (data.rules.length > 0) {
        const { error: rulesError } = await supabase
          .from('property_rules')
          .insert(
            data.rules.map((rule, index) => ({
              property_id: property.id,
              rule,
              display_order: index
            }))
          );

        if (rulesError) throw rulesError;
      }

      // Get admin users
      const { data: admins } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin');

      // Create notifications for all admins
      if (admins && admins.length > 0) {
        const notifications = admins.map(admin => ({
          user_id: admin.id,
          type: 'new_listing',
          title: 'New Property Listing Submitted',
          message: `A new property "${data.name}" has been submitted and requires approval.`,
          property_id: property.id,
          data: { property_name: data.name, submitted_by: user.email }
        }));

        await supabase
          .from('notifications')
          .insert(notifications);
      }

      // Send email notification to admin
      await supabase.functions.invoke('send-listing-notification', {
        body: {
          propertyName: data.name,
          propertyId: property.id,
          submittedBy: user.email || 'Unknown',
          adminEmail: 'babysayme143@gmail.com'
        }
      });

      toast.success('Property listing submitted successfully! It will be reviewed by our team.');
      navigate('/');
    } catch (error: any) {
      console.error('Error submitting listing:', error);
      toast.error('Failed to submit listing. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Add your PG, hostel, or rental accommodation to our platform. Your listing will be reviewed by our team before going live.
          </p>
        </div>
        
        <ListingForm onSubmit={handleSubmit} />
      </div>
      
      <Footer />
    </div>
  );
};

export default AddListing;


import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/lib/types';

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async (): Promise<Property[]> => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_locations(*),
          room_details(*),
          property_photos(*),
          property_amenities(amenities(name)),
          property_rules(*),
          contact_info(*),
          nearby_places(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      return properties?.map(property => ({
        id: property.id,
        name: property.name,
        description: property.description,
        type: property.type as Property['type'],
        price: property.price,
        location: {
          address: property.property_locations[0]?.address || '',
          city: property.property_locations[0]?.city || '',
          state: property.property_locations[0]?.state || '',
          zipCode: property.property_locations[0]?.zip_code || '',
          coordinates: [
            property.property_locations[0]?.latitude || 0,
            property.property_locations[0]?.longitude || 0
          ] as [number, number]
        },
        roomDetails: {
          roomType: property.room_details[0]?.room_type as Property['roomDetails']['roomType'] || 'private',
          bedrooms: property.room_details[0]?.bedrooms || 1,
          bathrooms: property.room_details[0]?.bathrooms || 1,
          genderPolicy: property.room_details[0]?.gender_policy as Property['roomDetails']['genderPolicy'] || 'co-ed',
          maxOccupancy: property.room_details[0]?.max_occupancy || 1,
          roomSize: property.room_details[0]?.room_size || 100
        },
        amenities: property.property_amenities?.map((pa: any) => pa.amenities.name) || [],
        rules: property.property_rules?.map((rule: any) => rule.rule) || [],
        photos: property.property_photos?.map((photo: any) => photo.url) || ['/placeholder.svg'],
        rating: property.rating || undefined,
        reviews: property.reviews || undefined,
        distanceToLandmark: property.distance_to_landmark || undefined,
        nearbyPlaces: property.nearby_places?.map((place: any) => place.place_name) || [],
        contactInfo: property.contact_info[0] ? {
          name: property.contact_info[0].name,
          email: property.contact_info[0].email,
          phone: property.contact_info[0].phone,
          responseTime: property.contact_info[0].response_time
        } : undefined,
        featured: property.featured || false
      })) || [];
    }
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async (): Promise<Property | null> => {
      const { data: property, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_locations(*),
          room_details(*),
          property_photos(*),
          property_amenities(amenities(name)),
          property_rules(*),
          contact_info(*),
          food_menu(*),
          nearby_places(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error('Error fetching property:', error);
        throw error;
      }

      if (!property) return null;

      return {
        id: property.id,
        name: property.name,
        description: property.description,
        type: property.type as Property['type'],
        price: property.price,
        location: {
          address: property.property_locations[0]?.address || '',
          city: property.property_locations[0]?.city || '',
          state: property.property_locations[0]?.state || '',
          zipCode: property.property_locations[0]?.zip_code || '',
          coordinates: [
            property.property_locations[0]?.latitude || 0,
            property.property_locations[0]?.longitude || 0
          ] as [number, number]
        },
        roomDetails: {
          roomType: property.room_details[0]?.room_type as Property['roomDetails']['roomType'] || 'private',
          bedrooms: property.room_details[0]?.bedrooms || 1,
          bathrooms: property.room_details[0]?.bathrooms || 1,
          genderPolicy: property.room_details[0]?.gender_policy as Property['roomDetails']['genderPolicy'] || 'co-ed',
          maxOccupancy: property.room_details[0]?.max_occupancy || 1,
          roomSize: property.room_details[0]?.room_size || 100
        },
        amenities: property.property_amenities?.map((pa: any) => pa.amenities.name) || [],
        rules: property.property_rules?.map((rule: any) => rule.rule) || [],
        photos: property.property_photos?.map((photo: any) => photo.url) || ['/placeholder.svg'],
        rating: property.rating || undefined,
        reviews: property.reviews || undefined,
        distanceToLandmark: property.distance_to_landmark || undefined,
        nearbyPlaces: property.nearby_places?.map((place: any) => place.place_name) || [],
        contactInfo: property.contact_info[0] ? {
          name: property.contact_info[0].name,
          email: property.contact_info[0].email,
          phone: property.contact_info[0].phone,
          responseTime: property.contact_info[0].response_time
        } : undefined,
        foodMenu: property.food_menu?.reduce((acc: any, menu: any) => {
          acc[menu.day_of_week.toLowerCase()] = {
            breakfast: menu.breakfast ? menu.breakfast.split(',') : [],
            lunch: menu.lunch ? menu.lunch.split(',') : [],
            dinner: menu.dinner ? menu.dinner.split(',') : []
          };
          return acc;
        }, {}),
        featured: property.featured || false
      };
    },
    enabled: !!id
  });
};

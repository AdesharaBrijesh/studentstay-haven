
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export const useAmenities = () => {
  return useQuery({
    queryKey: ['amenities'],
    queryFn: async (): Promise<Amenity[]> => {
      const { data, error } = await supabase
        .from('amenities')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching amenities:', error);
        throw error;
      }

      return data || [];
    }
  });
};

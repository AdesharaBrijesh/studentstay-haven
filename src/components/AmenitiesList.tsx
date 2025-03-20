
import React from 'react';
import { Check, Wifi, Dumbbell, Book, MapPin, Lock, Utensils } from 'lucide-react';

interface AmenitiesListProps {
  amenities: string[];
  showAll?: boolean;
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities, showAll = false }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-5 w-5 text-primary" />;
      case 'gym':
        return <Dumbbell className="h-5 w-5 text-primary" />;
      case 'study-room':
        return <Book className="h-5 w-5 text-primary" />;
      case 'parking':
        return <MapPin className="h-5 w-5 text-primary" />;
      case 'security':
        return <Lock className="h-5 w-5 text-primary" />;
      case 'kitchen':
        return <Utensils className="h-5 w-5 text-primary" />;
      default:
        return <Check className="h-5 w-5 text-primary" />;
    }
  };

  const getAmenityName = (amenity: string) => {
    return amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/-/g, ' ');
  };

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
      {displayedAmenities.map((amenity) => (
        <div key={amenity} className="flex items-center space-x-3">
          {getAmenityIcon(amenity)}
          <span className="text-gray-700">{getAmenityName(amenity)}</span>
        </div>
      ))}
      
      {!showAll && amenities.length > 6 && (
        <div className="flex items-center space-x-3 text-primary">
          <span>+{amenities.length - 6} more amenities</span>
        </div>
      )}
    </div>
  );
};

export default AmenitiesList;

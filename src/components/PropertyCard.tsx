import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import CompareButton from './CompareButton';
import { Property } from '../lib/types';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const getPropertyTypeLabel = (type: string) => {
    switch(type) {
      case 'pg':
        return 'PG';
      case 'hostel':
        return 'Hostel';
      case 'shared-apartment':
        return 'Shared Apartment';
      case 'single-room':
        return 'Single Room';
      case 'dormitory':
        return 'Dormitory';
      default:
        return type;
    }
  };

  return (
    <Link to={`/property/${property.id}`} className={`block group ${featured ? '' : 'h-full'}`}>
      <div className={`border border-gray-200 rounded-xl overflow-hidden transition-all bg-white hover:shadow-md ${
        featured ? 'flex flex-col md:flex-row' : 'h-full flex flex-col'
      }`}>
        {/* Property Image */}
        <div className={`relative ${featured ? 'w-full md:w-1/3 md:flex-shrink-0' : 'aspect-[4/3]'}`}>
          <img 
            src={property.photos[0]} 
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <CompareButton property={property} />
            {property.featured && (
              <span className="bg-primary text-xs font-semibold text-white px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>
        </div>
        
        {/* Property Details */}
        <div className={`p-4 flex flex-col ${featured ? 'md:w-2/3' : 'flex-grow'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
              {property.name}
            </h3>
            <div className="text-lg font-bold text-gray-900">₹{property.price}</div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="truncate">{property.location.address}, {property.location.city}</span>
          </div>
          
          <div className="flex items-center mb-3">
            {property.rating ? (
              <>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{property.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
              </>
            ) : null}
            <span className="text-sm text-muted-foreground">
              {getPropertyTypeLabel(property.type)}
            </span>
            {property.distanceToLandmark && (
              <>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-muted-foreground">{property.distanceToLandmark}</span>
              </>
            )}
          </div>
          
          {featured && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {property.description}
            </p>
          )}
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 4).map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

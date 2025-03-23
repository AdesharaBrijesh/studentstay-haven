
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Property } from '../../lib/types';

interface PropertyColumnProps {
  property: Property;
}

const PropertyColumn: React.FC<PropertyColumnProps> = ({ property }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full mb-3">
        <img
          src={property.photos[0]}
          alt={property.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        <Link
          to={`/property/${property.id}`}
          className="absolute bottom-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded hover:bg-primary transition-colors"
        >
          View Details
        </Link>
      </div>
      <h3 className="font-semibold text-center">{property.name}</h3>
      <div className="flex items-center mt-1">
        {property.rating && (
          <>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{property.rating}</span>
          </>
        )}
      </div>
      <div className="mt-2 text-primary font-semibold">₹{property.price} <span className="text-xs font-normal text-muted-foreground">/ month</span></div>
    </div>
  );
};

export default PropertyColumn;

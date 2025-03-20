import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, MapPin, User, Bath, ArrowRight } from 'lucide-react';
import { Property } from '../lib/types';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featured && property.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % property.photos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featured, property.photos.length]);

  useEffect(() => {
    if (cardRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return '📶';
      case 'gym':
        return '💪';
      case 'laundry':
        return '🧺';
      case 'study-room':
        return '📚';
      case 'parking':
        return '🅿️';
      case 'security':
        return '🔒';
      case 'kitchen':
        return '🍳';
      case 'air-conditioning':
        return '❄️';
      case 'pool':
        return '🏊';
      default:
        return '✓';
    }
  };

  return (
    <div 
      ref={cardRef} 
      className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md opacity-0 -translate-y-4 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : ''}`}>
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={property.photos[currentImageIndex]}
              alt={property.name}
              className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </div>
          
          {property.photos.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
              {property.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white w-6' : 'bg-white/60'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-all hover:bg-white"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
            />
          </button>
          
          <div className="absolute top-3 left-3">
            <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {property.type === 'pg' 
                ? 'PG' 
                : property.type === 'hostel' 
                  ? 'Hostel' 
                  : property.type === 'dormitory' 
                    ? 'Dormitory' 
                    : property.type === 'shared-apartment'
                      ? 'Shared Apartment'
                      : 'Single Room'}
            </div>
          </div>
        </div>

        <div className={`p-5 flex flex-col ${featured ? 'lg:w-1/2 lg:p-6' : ''}`}>
          <div className="mb-auto">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {property.name}
              </h3>
              <p className="text-lg font-bold text-primary">
                ₹{property.price}
                <span className="text-xs text-muted-foreground font-normal">/mo</span>
              </p>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{property.location.address}, {property.location.city}</span>
            </div>
            
            {property.rating && (
              <div className="flex items-center space-x-1 mb-3">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-sm">{property.rating}</span>
                <span className="text-muted-foreground text-sm">({property.reviews} reviews)</span>
              </div>
            )}
            
            {featured && (
              <p className="text-muted-foreground text-sm mt-2 mb-4 line-clamp-3">
                {property.description}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-3">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{property.roomDetails.roomType} Room</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Bath className="h-4 w-4" />
                <span>{property.roomDetails.bathrooms} Bath</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {property.amenities.slice(0, 4).map((amenity) => (
                <div 
                  key={amenity} 
                  className="text-xs px-2 py-1 bg-gray-50 rounded-full text-muted-foreground"
                >
                  <span className="mr-1">{getAmenityIcon(amenity)}</span>
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace('-', ' ')}
                </div>
              ))}
            </div>
            
            <Link 
              to={`/property/${property.id}`} 
              className="flex items-center justify-between group/btn"
            >
              <span className="text-sm font-medium text-primary">View Details</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

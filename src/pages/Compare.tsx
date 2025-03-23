
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, User, Bath } from 'lucide-react';
import Footer from '../components/Footer';
import { Property } from '../lib/types';

const Compare = () => {
  const location = useLocation();
  const { properties } = location.state as { properties: Property[] } || { properties: [] };

  if (!properties || properties.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">No Properties to Compare</h1>
          <p className="text-muted-foreground mb-8">
            Please add properties to your comparison list first.
          </p>
          <Link
            to="/listings"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen pt-16">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/listings"
            className="inline-flex items-center text-muted-foreground hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Listings
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Compare Properties</h1>
        
        <div className="overflow-x-auto pb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 border-b-2 border-gray-100 w-1/4">Property</th>
                {properties.map((property) => (
                  <th key={property.id} className="p-4 border-b-2 border-gray-100">
                    <div className="flex flex-col items-center">
                      <img
                        src={property.photos[0]}
                        alt={property.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
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
                      <Link
                        to={`/property/${property.id}`}
                        className="mt-3 text-sm font-medium text-primary hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Property Type</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    {getPropertyTypeLabel(property.type)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Location</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
                      <span className="truncate">{property.location.address}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Room Type</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    {property.roomDetails.roomType === 'private' 
                      ? 'Private Room' 
                      : property.roomDetails.roomType === 'shared' 
                        ? 'Shared Room' 
                        : 'Studio'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Gender Policy</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    {property.roomDetails.genderPolicy === 'co-ed' 
                      ? 'Co-ed' 
                      : property.roomDetails.genderPolicy === 'male' 
                        ? 'Male Only' 
                        : 'Female Only'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Rooms</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    {property.roomDetails.bedrooms} <User className="inline h-4 w-4" /> {property.roomDetails.bathrooms} <Bath className="inline h-4 w-4" />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Room Size</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    {property.roomDetails.roomSize} sq ft
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Key Amenities</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100">
                    <ul className="text-sm space-y-1">
                      {property.amenities.slice(0, 5).map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Food Included</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 border-b border-gray-100 text-center">
                    {property.foodMenu ? 'Yes' : 'No'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Compare;

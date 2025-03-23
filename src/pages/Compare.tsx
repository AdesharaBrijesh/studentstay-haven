
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Star, 
  MapPin, 
  User, 
  Bath, 
  Check,
  X,
  ArrowLeftRight,
  ArrowUp
} from 'lucide-react';
import Footer from '../components/Footer';
import { Property } from '../lib/types';
import { getPropertyTypeLabel } from '../utils/propertyUtils';
import { Separator } from '../components/ui/separator';

const Compare = () => {
  const location = useLocation();
  const { properties } = location.state as { properties: Property[] } || { properties: [] };
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);

  // Track scroll position to show scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Function to determine if values are the same across properties
  const areValuesSame = (key, extractValue) => {
    if (properties.length <= 1) return false;
    const firstValue = extractValue(properties[0], key);
    return properties.every(property => extractValue(property, key) === firstValue);
  };

  // Get cell background based on highlight setting and value sameness
  const getCellBackground = (key, extractValue) => {
    if (!highlightDifferences) return "";
    return areValuesSame(key, extractValue)
      ? "bg-gray-50"
      : "bg-blue-50";
  };

  // Render amenity status with check/x icons
  const renderAmenityStatus = (hasAmenity) => {
    return hasAmenity 
      ? <Check className="h-5 w-5 text-green-500" /> 
      : <X className="h-5 w-5 text-red-400" />;
  };

  // Calculate dynamic width for property columns based on number of properties
  const getPropertyColumnWidth = () => {
    if (properties.length === 1) return "w-full";
    if (properties.length === 2) return "w-1/2";
    return ""; // Default width for 3 properties
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link 
            to="/listings"
            className="inline-flex items-center text-muted-foreground hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Listings
          </Link>
          
          <button
            onClick={() => setHighlightDifferences(!highlightDifferences)}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            {highlightDifferences ? 'Hide Differences' : 'Highlight Differences'}
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Compare Properties</h1>
        
        <div className="overflow-x-auto pb-4">
          <table className="w-full border-collapse">
            {/* Sticky headers */}
            <thead className="sticky top-[120px] z-10">
              <tr>
                <th className="text-left p-4 bg-white border-b-2 border-gray-100 w-1/4 min-w-[200px]">Property</th>
                {properties.map((property) => (
                  <th key={property.id} className={`p-4 border-b-2 border-gray-100 bg-white min-w-[250px] ${getPropertyColumnWidth()}`}>
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Basic Details */}
              <tr>
                <td colSpan={properties.length + 1} className="bg-gray-100 p-2">
                  <h3 className="font-medium">Basic Details</h3>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Property Type</td>
                {properties.map((property) => (
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 text-center ${getCellBackground('type', (p) => p.type)} ${getPropertyColumnWidth()}`}
                  >
                    {getPropertyTypeLabel(property.type)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Location</td>
                {properties.map((property) => (
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 ${getCellBackground('location', (p) => p.location.address)} ${getPropertyColumnWidth()}`}
                  >
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
                      <span className="truncate">{property.location.address}</span>
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Room Details */}
              <tr>
                <td colSpan={properties.length + 1} className="bg-gray-100 p-2">
                  <h3 className="font-medium">Room Details</h3>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Room Type</td>
                {properties.map((property) => (
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 text-center ${getCellBackground('roomType', (p) => p.roomDetails.roomType)} ${getPropertyColumnWidth()}`}
                  >
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
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 text-center ${getCellBackground('genderPolicy', (p) => p.roomDetails.genderPolicy)} ${getPropertyColumnWidth()}`}
                  >
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      property.roomDetails.genderPolicy === 'male' 
                        ? 'bg-blue-100 text-blue-800' 
                        : property.roomDetails.genderPolicy === 'female'
                          ? 'bg-pink-100 text-pink-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {property.roomDetails.genderPolicy === 'co-ed' 
                        ? 'Co-ed' 
                        : property.roomDetails.genderPolicy === 'male' 
                          ? 'Male Only' 
                          : 'Female Only'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Rooms</td>
                {properties.map((property) => (
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 text-center ${getCellBackground('rooms', (p) => `${p.roomDetails.bedrooms}-${p.roomDetails.bathrooms}`)} ${getPropertyColumnWidth()}`}
                  >
                    <div className="flex justify-center gap-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" /> 
                        <span>{property.roomDetails.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.roomDetails.bathrooms}</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Room Size</td>
                {properties.map((property) => (
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 text-center ${getCellBackground('roomSize', (p) => p.roomDetails.roomSize)} ${getPropertyColumnWidth()}`}
                  >
                    <span className="font-medium">{property.roomDetails.roomSize}</span> <span className="text-muted-foreground">sq ft</span>
                  </td>
                ))}
              </tr>
              
              {/* Amenities */}
              <tr>
                <td colSpan={properties.length + 1} className="bg-gray-100 p-2">
                  <h3 className="font-medium">Amenities</h3>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">Food Included</td>
                {properties.map((property) => (
                  <td 
                    key={property.id} 
                    className={`p-4 border-b border-gray-100 text-center ${getCellBackground('food', (p) => p.foodMenu ? 'yes' : 'no')} ${getPropertyColumnWidth()}`}
                  >
                    {renderAmenityStatus(property.foodMenu)}
                  </td>
                ))}
              </tr>
              
              {/* Get all unique amenities across all properties */}
              {Array.from(new Set(properties.flatMap(p => p.amenities))).map((amenity, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">{amenity}</td>
                  {properties.map((property) => (
                    <td 
                      key={property.id} 
                      className={`p-4 border-b border-gray-100 text-center ${getCellBackground(amenity, (p) => p.amenities.includes(amenity))} ${getPropertyColumnWidth()}`}
                    >
                      {renderAmenityStatus(property.amenities.includes(amenity))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {scrollVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default Compare;

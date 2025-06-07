
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperties';
import ImageGallery from '../components/ImageGallery';
import AmenitiesList from '../components/AmenitiesList';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';
import Footer from '../components/Footer';
import { MapPin, Users, Home, Ruler, Star } from 'lucide-react';
import { getPropertyTypeLabel } from '../utils/propertyUtils';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error } = useProperty(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
              <div className="flex items-center gap-4">
                {property.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{property.rating}</span>
                    {property.reviews && (
                      <span className="ml-1 text-muted-foreground">({property.reviews} reviews)</span>
                    )}
                  </div>
                )}
                <span className="text-muted-foreground">{getPropertyTypeLabel(property.type)}</span>
                {property.distanceToLandmark && (
                  <span className="text-muted-foreground">{property.distanceToLandmark}</span>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-primary">₹{property.price}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={property.photos} />

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Room Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="font-medium">{property.roomDetails.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="font-medium">{property.roomDetails.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="font-medium">{property.roomDetails.maxOccupancy}</div>
                    <div className="text-sm text-muted-foreground">Max Guests</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="font-medium">{property.roomDetails.roomSize} sq ft</div>
                    <div className="text-sm text-muted-foreground">Room Size</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-gray-900">Room Type</div>
                  <div className="text-gray-600 capitalize">{property.roomDetails.roomType}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Gender Policy</div>
                  <div className="text-gray-600 capitalize">{property.roomDetails.genderPolicy}</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <AmenitiesList amenities={property.amenities} />
            </div>

            {/* Rules */}
            {property.rules && property.rules.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">House Rules</h2>
                <ul className="space-y-2">
                  {property.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Food Menu */}
            {property.foodMenu && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Weekly Food Menu</h2>
                <div className="space-y-4">
                  {Object.entries(property.foodMenu).map(([day, meals]) => (
                    <div key={day} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h3 className="font-medium capitalize mb-2">{day}</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Breakfast:</span>
                          <p className="text-gray-600">{meals.breakfast.join(', ') || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Lunch:</span>
                          <p className="text-gray-600">{meals.lunch.join(', ') || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Dinner:</span>
                          <p className="text-gray-600">{meals.dinner.join(', ') || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="mb-4">
                <p className="text-gray-700">{property.location.address}</p>
                <p className="text-gray-700">{property.location.city}, {property.location.state} {property.location.zipCode}</p>
              </div>
              <Map coordinates={property.location.coordinates} />
              
              {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Nearby Places</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.nearbyPlaces.map((place, index) => (
                      <div key={index} className="text-sm text-gray-600">• {place}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm propertyId={property.id} contactInfo={property.contactInfo} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;

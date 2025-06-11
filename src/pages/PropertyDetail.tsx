import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, CheckCircle, Wifi, Dumbbell, Book, Lock, Utensils } from 'lucide-react';
import AmenitiesList from '../components/AmenitiesList';
import DaySelector from '../components/DaySelector';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Map from '../components/Map';
import { Property } from '../lib/types';
import { supabase } from '@/integrations/supabase/client';
import { getPropertyTypeLabel } from '../utils/propertyUtils';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        console.error("Property ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            property_locations(*),
            room_details(*),
            contact_info(*)
          `)
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching property:", error);
        }

        if (data) {
          // Transform the data to match the Property interface
          const transformedProperty: Property = {
            id: data.id,
            name: data.name,
            description: data.description,
            type: data.type,
            price: data.price,
            location: {
              address: data.property_locations[0].address,
              city: data.property_locations[0].city,
              state: data.property_locations[0].state,
              zipCode: data.property_locations[0].zip_code,
              coordinates: [
                data.property_locations[0].latitude,
                data.property_locations[0].longitude,
              ],
            },
            roomDetails: {
              roomType: data.room_details[0].room_type,
              bedrooms: data.room_details[0].bedrooms,
              bathrooms: data.room_details[0].bathrooms,
              genderPolicy: data.room_details[0].gender_policy,
              maxOccupancy: data.room_details[0].max_occupancy,
              roomSize: data.room_details[0].room_size,
            },
            amenities: data.amenities || [],
            rules: data.rules || [],
            photos: data.photos || [],
            rating: data.rating,
            reviews: data.reviews,
            distanceToLandmark: data.distance_to_landmark,
            nearbyPlaces: data.nearby_places,
            foodMenu: data.food_menu,
            contactInfo: {
              name: data.contact_info[0].name,
              email: data.contact_info[0].email,
              phone: data.contact_info[0].phone,
            },
            availability: data.availability,
            featured: data.featured,
          };
          setProperty(transformedProperty);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link to="/listings" className="text-primary hover:underline">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={property.photos[0]}
          alt={property.name}
          className="w-full h-[450px] object-cover rounded-b-2xl shadow-lg"
        />
        <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
          {getPropertyTypeLabel(property.type)}
        </div>
        <div className="absolute bottom-4 left-4 text-white text-shadow-md">
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location.address}, {property.location.city}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4">Property Overview</h2>
              <div className="flex items-center mb-4">
                {property.rating && (
                  <>
                    <div className="flex items-center mr-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-gray-700 font-medium">{property.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                  </>
                )}
                <span className="ml-2 text-gray-600">
                  {property.roomDetails.roomType} Room
                </span>
              </div>
              <p className="text-gray-700 mb-6">{property.description}</p>

              {/* Key Details */}
              <h3 className="text-xl font-semibold mb-3">Key Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Price:</span> ₹{property.price}/month
                </div>
                <div>
                  <span className="font-medium">Bedrooms:</span> {property.roomDetails.bedrooms}
                </div>
                <div>
                  <span className="font-medium">Bathrooms:</span> {property.roomDetails.bathrooms}
                </div>
                <div>
                  <span className="font-medium">Room Size:</span> {property.roomDetails.roomSize} sqft
                </div>
                <div>
                  <span className="font-medium">Max Occupancy:</span> {property.roomDetails.maxOccupancy}
                </div>
                <div>
                  <span className="font-medium">Gender Policy:</span> {property.roomDetails.genderPolicy}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
              <h3 className="text-xl font-semibold mb-4">
                <CheckCircle className="h-6 w-6 mr-2 inline-block align-middle text-primary" />
                Amenities
              </h3>
              <AmenitiesList amenities={property.amenities} showAll={true} />
            </div>

            {/* Food Menu */}
            {property.foodMenu && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
                <h3 className="text-xl font-semibold mb-4">Food Menu</h3>
                <DaySelector foodMenu={property.foodMenu} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <Map coordinates={property.location.coordinates} />
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="text-gray-700">
                <p className="mb-2">
                  <span className="font-medium">Name:</span> {property.contactInfo?.name}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Email:</span> {property.contactInfo?.email}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Phone:</span> {property.contactInfo?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Contact Property Owner</h2>
          <ContactForm propertyId={property.id} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;

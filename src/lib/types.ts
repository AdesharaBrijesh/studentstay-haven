
export interface Property {
  id: string;
  name: string;
  description: string;
  type: 'student-housing' | 'pg' | 'dormitory' | 'shared-house' | 'hostel';
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: [number, number];
  };
  roomDetails: {
    roomType: 'private' | 'shared' | 'studio';
    bedrooms: number;
    bathrooms: number;
    genderPolicy: 'co-ed' | 'male' | 'female';
    maxOccupancy: number;
    roomSize: number;
  };
  amenities: string[];
  rules: string[];
  photos: string[];
  rating?: number;
  reviews?: number;
  distanceToCampus?: string;
  nearbyPlaces?: string[];
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
    responseTime?: string;
  };
  availability?: Date;
  featured?: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  roomTypes: string[];
  genderPolicy: string[];
  amenities: string[];
  location: string;
}

export interface PropertyFormData {
  name: string;
  type: string;
  price: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  roomDetails: {
    roomType: string;
    bedrooms: string;
    bathrooms: string;
    genderPolicy: string;
    maxOccupancy: string;
    roomSize: string;
  };
  amenities: string[];
  rules: string[];
  photos: File[];
  description: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  termsAccepted: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
}


import { Property, Amenity } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Sunshine Student Living',
    description: 'Experience luxury student living at its finest in our newly renovated residence. Featuring modern amenities, spacious rooms, and a prime location just minutes from major universities. Our community offers the perfect blend of privacy and social spaces, designed specifically for student life.',
    type: 'student-housing',
    price: 800,
    location: {
      address: '123 University Avenue',
      city: 'Boston',
      state: 'MA',
      zipCode: '02115',
      coordinates: [42.3601, -71.0589]
    },
    roomDetails: {
      roomType: 'private',
      bedrooms: 1,
      bathrooms: 1,
      genderPolicy: 'co-ed',
      maxOccupancy: 1,
      roomSize: 250
    },
    amenities: ['wifi', 'gym', 'laundry', 'study-room', 'security', 'kitchen'],
    rules: ['No smoking', 'No pets', 'Quiet hours 10pm-7am'],
    photos: [
      'https://public.readdy.ai/ai/img_res/9302ceb96cb62fd4fdeef138a37f90a0.jpg',
      'https://public.readdy.ai/ai/img_res/69a2687601fa828ee41cc520e39faa02.jpg'
    ],
    rating: 4.5,
    reviews: 128,
    distanceToCampus: '5 min walk',
    nearbyPlaces: ['University Library', 'Student Center', 'Grocery Store'],
    contactInfo: {
      name: 'Sarah Johnson',
      email: 'info@sunshineliving.com',
      phone: '(555) 123-4567',
      responseTime: '<1 hour'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Elite Student Housing',
    description: 'Premium student accommodations with all-inclusive amenities. Located in the heart of the university district, Elite Student Housing offers modern living spaces with high-end finishes. Our property features 24/7 security, dedicated study spaces, and a vibrant community of students from across the globe.',
    type: 'dormitory',
    price: 950,
    location: {
      address: '456 College Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02215',
      coordinates: [42.3736, -71.1097]
    },
    roomDetails: {
      roomType: 'shared',
      bedrooms: 2,
      bathrooms: 1,
      genderPolicy: 'female',
      maxOccupancy: 2,
      roomSize: 400
    },
    amenities: ['wifi', 'gym', 'pool', 'parking', 'air-conditioning', 'kitchen'],
    rules: ['No overnight guests', 'No alcohol', 'Keep common areas clean'],
    photos: [
      'https://public.readdy.ai/ai/img_res/4fc8d2f4ebde6949352966a3185850ac.jpg',
      'https://public.readdy.ai/ai/img_res/633a04ba2447e8fdf0a4e051536a9dcb.jpg'
    ],
    rating: 4.8,
    reviews: 156,
    distanceToCampus: '10 min walk',
    nearbyPlaces: ['Campus Café', 'Bookstore', 'Recreation Center'],
    contactInfo: {
      name: 'Michael Chen',
      email: 'housing@elitestudent.com',
      phone: '(555) 987-6543',
      responseTime: '2 hours'
    },
    featured: true
  },
  {
    id: '3',
    name: 'University Square Residences',
    description: 'A modern community designed with students in mind. Our professionally managed property offers a variety of floor plans to suit your needs. With all-inclusive pricing and individual leases, we make student living hassle-free.',
    type: 'pg',
    price: 720,
    location: {
      address: '789 Academic Drive',
      city: 'Boston',
      state: 'MA',
      zipCode: '02120',
      coordinates: [42.3350, -71.0914]
    },
    roomDetails: {
      roomType: 'private',
      bedrooms: 1,
      bathrooms: 1,
      genderPolicy: 'co-ed',
      maxOccupancy: 1,
      roomSize: 220
    },
    amenities: ['wifi', 'laundry', 'study-room', 'security', 'kitchen'],
    rules: ['No smoking', 'Guests limited to 2 per resident'],
    photos: [
      'https://public.readdy.ai/ai/img_res/c0b22cb2ac1a559bf26085b7bfd06001.jpg',
      'https://public.readdy.ai/ai/img_res/df1301c19b0b89a4129c2156c8246707.jpg'
    ],
    rating: 4.2,
    reviews: 89,
    distanceToCampus: '15 min walk',
    nearbyPlaces: ['Subway Station', 'Coffee Shop', 'Pharmacy'],
    contactInfo: {
      name: 'Jessica Taylor',
      email: 'info@universitysquare.com',
      phone: '(555) 234-5678',
      responseTime: '3 hours'
    }
  },
  {
    id: '4',
    name: 'The Student Lodge',
    description: 'Affordable, comfortable student housing in a safe and friendly environment. The Student Lodge offers fully furnished rooms with all utilities included. Our dedicated staff ensures a supportive atmosphere for academic success.',
    type: 'hostel',
    price: 650,
    location: {
      address: '101 Scholar Lane',
      city: 'Boston',
      state: 'MA',
      zipCode: '02125',
      coordinates: [42.3133, -71.0571]
    },
    roomDetails: {
      roomType: 'shared',
      bedrooms: 2,
      bathrooms: 1,
      genderPolicy: 'male',
      maxOccupancy: 2,
      roomSize: 350
    },
    amenities: ['wifi', 'laundry', 'kitchen', 'security'],
    rules: ['Quiet hours 9pm-8am', 'No alcohol', 'Clean up after yourself'],
    photos: [
      'https://public.readdy.ai/ai/img_res/be6b161bbf37bf9bad8fb05f4f7f0ef4.jpg',
      'https://public.readdy.ai/ai/img_res/ab6dc0424091321fbfb51a13a1cd4b3f.jpg'
    ],
    rating: 4.0,
    reviews: 62,
    distanceToCampus: '20 min walk',
    nearbyPlaces: ['Bus Stop', 'Convenience Store', 'Park'],
    contactInfo: {
      name: 'Robert Davis',
      email: 'info@studentlodge.com',
      phone: '(555) 345-6789',
      responseTime: '4 hours'
    }
  },
  {
    id: '5',
    name: 'Campus View Apartments',
    description: 'Luxury apartments with stunning views of the campus. Our spacious units feature high-end finishes, in-unit laundry, and private balconies. Residents enjoy access to a rooftop terrace, fitness center, and study lounges.',
    type: 'student-housing',
    price: 1200,
    location: {
      address: '222 University Blvd',
      city: 'Boston',
      state: 'MA',
      zipCode: '02215',
      coordinates: [42.3497, -71.1015]
    },
    roomDetails: {
      roomType: 'studio',
      bedrooms: 1,
      bathrooms: 1,
      genderPolicy: 'co-ed',
      maxOccupancy: 1,
      roomSize: 500
    },
    amenities: ['wifi', 'gym', 'laundry', 'study-room', 'air-conditioning', 'parking', 'security', 'kitchen'],
    rules: ['No smoking', 'No pets', 'Noise restrictions after 11pm'],
    photos: [
      'https://public.readdy.ai/ai/img_res/df1301c19b0b89a4129c2156c8246707.jpg',
      'https://public.readdy.ai/ai/img_res/c0b22cb2ac1a559bf26085b7bfd06001.jpg'
    ],
    rating: 4.9,
    reviews: 204,
    distanceToCampus: '5 min walk',
    nearbyPlaces: ['Campus Dining Hall', 'Sports Complex', 'Student Union'],
    contactInfo: {
      name: 'Amanda Wilson',
      email: 'leasing@campusview.com',
      phone: '(555) 456-7890',
      responseTime: '<1 hour'
    },
    featured: true
  },
  {
    id: '6',
    name: 'Scholar's Retreat',
    description: 'Peaceful, academic-focused living environment designed for serious students. Our property offers individual study nooks, group study rooms, and quiet hours throughout the day. Enjoy a conducive atmosphere for academic excellence.',
    type: 'shared-house',
    price: 780,
    location: {
      address: '333 Graduate Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02114',
      coordinates: [42.3616, -71.0695]
    },
    roomDetails: {
      roomType: 'private',
      bedrooms: 1,
      bathrooms: 1,
      genderPolicy: 'co-ed',
      maxOccupancy: 1,
      roomSize: 260
    },
    amenities: ['wifi', 'study-room', 'laundry', 'kitchen', 'security'],
    rules: ['24/7 quiet environment', 'Academic purposes only', 'No parties'],
    photos: [
      'https://public.readdy.ai/ai/img_res/be6b161bbf37bf9bad8fb05f4f7f0ef4.jpg',
      'https://public.readdy.ai/ai/img_res/ab6dc0424091321fbfb51a13a1cd4b3f.jpg'
    ],
    rating: 4.7,
    reviews: 113,
    distanceToCampus: '12 min walk',
    nearbyPlaces: ['University Library', 'Research Center', 'Coffee Shop'],
    contactInfo: {
      name: 'David Kim',
      email: 'info@scholarsretreat.com',
      phone: '(555) 567-8901',
      responseTime: '2 hours'
    }
  }
];

export const AMENITIES: Amenity[] = [
  { id: 'wifi', name: 'WiFi', icon: 'wifi' },
  { id: 'air-conditioning', name: 'Air Conditioning', icon: 'snowflake' },
  { id: 'laundry', name: 'Laundry', icon: 'washing-machine' },
  { id: 'gym', name: 'Gym', icon: 'dumbbell' },
  { id: 'study-room', name: 'Study Room', icon: 'book' },
  { id: 'parking', name: 'Parking', icon: 'parking' },
  { id: 'security', name: 'Security', icon: 'shield-alt' },
  { id: 'kitchen', name: 'Kitchen', icon: 'utensils' }
];

export const PRICE_RANGES = [
  { min: 0, max: 500, label: 'Under $500' },
  { min: 500, max: 750, label: '$500 - $750' },
  { min: 750, max: 1000, label: '$750 - $1000' },
  { min: 1000, max: 1500, label: '$1000 - $1500' },
  { min: 1500, max: 10000, label: '$1500+' }
];

export const ROOM_TYPES = [
  { id: 'private', label: 'Private Room' },
  { id: 'shared', label: 'Shared Room' },
  { id: 'studio', label: 'Studio' }
];

export const GENDER_POLICIES = [
  { id: 'co-ed', label: 'Co-ed' },
  { id: 'male', label: 'Male Only' },
  { id: 'female', label: 'Female Only' }
];

export const PROPERTY_TYPES = [
  { id: 'student-housing', label: 'Student Housing' },
  { id: 'pg', label: 'Paying Guest (PG)' },
  { id: 'dormitory', label: 'Dormitory' },
  { id: 'shared-house', label: 'Shared House' },
  { id: 'hostel', label: 'Hostel' }
];

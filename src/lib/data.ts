
import { Property, Amenity } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Comfort Living PG',
    description: 'Experience luxury living at its finest in our newly renovated residence. Featuring modern amenities, spacious rooms, and a prime location just minutes from major office hubs and educational institutions. Our community offers the perfect blend of privacy and social spaces, designed specifically for comfortable living.',
    type: 'pg',
    price: 8000,
    location: {
      address: '123 CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380009',
      coordinates: [23.0225, 72.5714]
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
    foodMenu: {
      monday: {
        breakfast: ['Poha', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Sabzi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Fry', 'Mixed Vegetable', 'Raita']
      },
      tuesday: {
        breakfast: ['Upma', 'Tea', 'Boiled Egg/Fruit'],
        lunch: ['Roti', 'Rice', 'Rajma', 'Aloo Gobi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Jeera Rice', 'Dal Tadka', 'Paneer Bhurji', 'Papad']
      },
      wednesday: {
        breakfast: ['Idli Sambar', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Kadhi', 'Bhindi Masala', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Pulao', 'Dal Makhani', 'Seasonal Vegetable', 'Raita']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Tea'],
        lunch: ['Roti', 'Rice', 'Chana Dal', 'Aloo Matar', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Tadka', 'Chole', 'Pickle']
      },
      friday: {
        breakfast: ['Dhokla', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Paneer Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Veg Biryani', 'Dal Fry', 'Mix Veg', 'Raita']
      },
      saturday: {
        breakfast: ['Thepla', 'Tea', 'Fruit'],
        lunch: ['Puri', 'Rice', 'Dal', 'Aloo Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal', 'Matar Paneer', 'Papad']
      },
      sunday: {
        breakfast: ['Pav Bhaji', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Jeera Rice', 'Special Dal', 'Shahi Paneer', 'Salad', 'Sweet'],
        dinner: ['Roti', 'Pulao', 'Dal Tadka', 'Seasonal Vegetable', 'Raita']
      }
    },
    rating: 4.5,
    reviews: 128,
    distanceToLandmark: '5 min walk to Vastrapur Lake',
    nearbyPlaces: ['Vastrapur Lake', 'Alpha One Mall', 'IIM Ahmedabad', 'Helmet Circle'],
    contactInfo: {
      name: 'Mohit Sharma',
      email: 'info@comfortliving.com',
      phone: '+91 98765 43210',
      responseTime: '<1 hour'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Elite Accommodation',
    description: 'Premium accommodations with all-inclusive amenities. Located in the heart of Ahmedabad, Elite Accommodation offers modern living spaces with high-end finishes. Our property features 24/7 security, dedicated work spaces, and a vibrant community of professionals from across the globe.',
    type: 'shared-apartment',
    price: 9500,
    location: {
      address: '456 SG Highway',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380054',
      coordinates: [23.0468, 72.5319]
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
    foodMenu: {
      monday: {
        breakfast: ['Poha', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Sabzi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Fry', 'Mixed Vegetable', 'Raita']
      },
      tuesday: {
        breakfast: ['Upma', 'Tea', 'Boiled Egg/Fruit'],
        lunch: ['Roti', 'Rice', 'Rajma', 'Aloo Gobi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Jeera Rice', 'Dal Tadka', 'Paneer Bhurji', 'Papad']
      },
      wednesday: {
        breakfast: ['Idli Sambar', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Kadhi', 'Bhindi Masala', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Pulao', 'Dal Makhani', 'Seasonal Vegetable', 'Raita']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Tea'],
        lunch: ['Roti', 'Rice', 'Chana Dal', 'Aloo Matar', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Tadka', 'Chole', 'Pickle']
      },
      friday: {
        breakfast: ['Dhokla', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Paneer Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Veg Biryani', 'Dal Fry', 'Mix Veg', 'Raita']
      },
      saturday: {
        breakfast: ['Thepla', 'Tea', 'Fruit'],
        lunch: ['Puri', 'Rice', 'Dal', 'Aloo Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal', 'Matar Paneer', 'Papad']
      },
      sunday: {
        breakfast: ['Pav Bhaji', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Jeera Rice', 'Special Dal', 'Shahi Paneer', 'Salad', 'Sweet'],
        dinner: ['Roti', 'Pulao', 'Dal Tadka', 'Seasonal Vegetable', 'Raita']
      }
    },
    rating: 4.8,
    reviews: 156,
    distanceToLandmark: '10 min walk to Iscon Mall',
    nearbyPlaces: ['Iscon Mall', 'Rajpath Club', 'Wide Chowk', 'Apollo Hospital'],
    contactInfo: {
      name: 'Priya Patel',
      email: 'housing@eliteaccommodation.com',
      phone: '+91 96385 27410',
      responseTime: '2 hours'
    },
    featured: true
  },
  {
    id: '3',
    name: 'City Square Residences',
    description: 'A modern community designed with professionals in mind. Our professionally managed property offers a variety of floor plans to suit your needs. With all-inclusive pricing and individual leases, we make living hassle-free.',
    type: 'pg',
    price: 7200,
    location: {
      address: '789 Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380009',
      coordinates: [23.0365, 72.5611]
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
    foodMenu: {
      monday: {
        breakfast: ['Poha', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Sabzi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Fry', 'Mixed Vegetable', 'Raita']
      },
      tuesday: {
        breakfast: ['Upma', 'Tea', 'Boiled Egg/Fruit'],
        lunch: ['Roti', 'Rice', 'Rajma', 'Aloo Gobi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Jeera Rice', 'Dal Tadka', 'Paneer Bhurji', 'Papad']
      },
      wednesday: {
        breakfast: ['Idli Sambar', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Kadhi', 'Bhindi Masala', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Pulao', 'Dal Makhani', 'Seasonal Vegetable', 'Raita']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Tea'],
        lunch: ['Roti', 'Rice', 'Chana Dal', 'Aloo Matar', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Tadka', 'Chole', 'Pickle']
      },
      friday: {
        breakfast: ['Dhokla', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Paneer Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Veg Biryani', 'Dal Fry', 'Mix Veg', 'Raita']
      },
      saturday: {
        breakfast: ['Thepla', 'Tea', 'Fruit'],
        lunch: ['Puri', 'Rice', 'Dal', 'Aloo Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal', 'Matar Paneer', 'Papad']
      },
      sunday: {
        breakfast: ['Pav Bhaji', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Jeera Rice', 'Special Dal', 'Shahi Paneer', 'Salad', 'Sweet'],
        dinner: ['Roti', 'Pulao', 'Dal Tadka', 'Seasonal Vegetable', 'Raita']
      }
    },
    rating: 4.2,
    reviews: 89,
    distanceToLandmark: '15 min walk to Law Garden',
    nearbyPlaces: ['Law Garden', 'Gujarat College', 'Crossword', 'City Gold Multiplex'],
    contactInfo: {
      name: 'Rajesh Mehta',
      email: 'info@citysquare.com',
      phone: '+91 88126 54973',
      responseTime: '3 hours'
    }
  },
  {
    id: '4',
    name: 'The Comfort Lodge',
    description: 'Affordable, comfortable accommodations in a safe and friendly environment. The Comfort Lodge offers fully furnished rooms with all utilities included. Our dedicated staff ensures a supportive atmosphere for residents.',
    type: 'hostel',
    price: 6500,
    location: {
      address: '101 Satellite',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380015',
      coordinates: [23.0300, 72.5200]
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
    foodMenu: {
      monday: {
        breakfast: ['Poha', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Sabzi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Fry', 'Mixed Vegetable', 'Raita']
      },
      tuesday: {
        breakfast: ['Upma', 'Tea', 'Boiled Egg/Fruit'],
        lunch: ['Roti', 'Rice', 'Rajma', 'Aloo Gobi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Jeera Rice', 'Dal Tadka', 'Paneer Bhurji', 'Papad']
      },
      wednesday: {
        breakfast: ['Idli Sambar', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Kadhi', 'Bhindi Masala', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Pulao', 'Dal Makhani', 'Seasonal Vegetable', 'Raita']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Tea'],
        lunch: ['Roti', 'Rice', 'Chana Dal', 'Aloo Matar', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Tadka', 'Chole', 'Pickle']
      },
      friday: {
        breakfast: ['Dhokla', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Paneer Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Veg Biryani', 'Dal Fry', 'Mix Veg', 'Raita']
      },
      saturday: {
        breakfast: ['Thepla', 'Tea', 'Fruit'],
        lunch: ['Puri', 'Rice', 'Dal', 'Aloo Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal', 'Matar Paneer', 'Papad']
      },
      sunday: {
        breakfast: ['Pav Bhaji', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Jeera Rice', 'Special Dal', 'Shahi Paneer', 'Salad', 'Sweet'],
        dinner: ['Roti', 'Pulao', 'Dal Tadka', 'Seasonal Vegetable', 'Raita']
      }
    },
    rating: 4.0,
    reviews: 62,
    distanceToLandmark: '20 min walk to ISRO',
    nearbyPlaces: ['ISRO', 'Jodhpur Cross Road', 'Shivranjani', 'Big Bazaar'],
    contactInfo: {
      name: 'Amit Singh',
      email: 'info@comfortlodge.com',
      phone: '+91 93475 62108',
      responseTime: '4 hours'
    }
  },
  {
    id: '5',
    name: 'Riverside Apartments',
    description: 'Luxury apartments with stunning views of the Sabarmati River. Our spacious units feature high-end finishes, in-unit laundry, and private balconies. Residents enjoy access to a rooftop terrace, fitness center, and work lounges.',
    type: 'single-room',
    price: 12000,
    location: {
      address: '222 Riverfront',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380001',
      coordinates: [23.0216, 72.5797]
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
    foodMenu: {
      monday: {
        breakfast: ['Poha', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Sabzi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Fry', 'Mixed Vegetable', 'Raita']
      },
      tuesday: {
        breakfast: ['Upma', 'Tea', 'Boiled Egg/Fruit'],
        lunch: ['Roti', 'Rice', 'Rajma', 'Aloo Gobi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Jeera Rice', 'Dal Tadka', 'Paneer Bhurji', 'Papad']
      },
      wednesday: {
        breakfast: ['Idli Sambar', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Kadhi', 'Bhindi Masala', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Pulao', 'Dal Makhani', 'Seasonal Vegetable', 'Raita']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Tea'],
        lunch: ['Roti', 'Rice', 'Chana Dal', 'Aloo Matar', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Tadka', 'Chole', 'Pickle']
      },
      friday: {
        breakfast: ['Dhokla', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Paneer Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Veg Biryani', 'Dal Fry', 'Mix Veg', 'Raita']
      },
      saturday: {
        breakfast: ['Thepla', 'Tea', 'Fruit'],
        lunch: ['Puri', 'Rice', 'Dal', 'Aloo Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal', 'Matar Paneer', 'Papad']
      },
      sunday: {
        breakfast: ['Pav Bhaji', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Jeera Rice', 'Special Dal', 'Shahi Paneer', 'Salad', 'Sweet'],
        dinner: ['Roti', 'Pulao', 'Dal Tadka', 'Seasonal Vegetable', 'Raita']
      }
    },
    rating: 4.9,
    reviews: 204,
    distanceToLandmark: '5 min walk to Sabarmati Riverfront',
    nearbyPlaces: ['Sabarmati Riverfront', 'Ellis Bridge', 'Nehru Bridge', 'Gandhi Ashram'],
    contactInfo: {
      name: 'Ananya Desai',
      email: 'leasing@riverside.com',
      phone: '+91 98245 76103',
      responseTime: '<1 hour'
    },
    featured: true
  },
  {
    id: '6',
    name: 'Tranquil Retreat',
    description: 'Peaceful, work-focused living environment designed for professionals. Our property offers individual work nooks, group meeting rooms, and quiet hours throughout the day. Enjoy a conducive atmosphere for productivity and comfort.',
    type: 'shared-apartment',
    price: 7800,
    location: {
      address: '333 Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380054',
      coordinates: [23.0401, 72.5092]
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
    rules: ['24/7 quiet environment', 'Professional purposes only', 'No parties'],
    photos: [
      'https://public.readdy.ai/ai/img_res/be6b161bbf37bf9bad8fb05f4f7f0ef4.jpg',
      'https://public.readdy.ai/ai/img_res/ab6dc0424091321fbfb51a13a1cd4b3f.jpg'
    ],
    foodMenu: {
      monday: {
        breakfast: ['Poha', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Sabzi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Fry', 'Mixed Vegetable', 'Raita']
      },
      tuesday: {
        breakfast: ['Upma', 'Tea', 'Boiled Egg/Fruit'],
        lunch: ['Roti', 'Rice', 'Rajma', 'Aloo Gobi', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Jeera Rice', 'Dal Tadka', 'Paneer Bhurji', 'Papad']
      },
      wednesday: {
        breakfast: ['Idli Sambar', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Kadhi', 'Bhindi Masala', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Pulao', 'Dal Makhani', 'Seasonal Vegetable', 'Raita']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Tea'],
        lunch: ['Roti', 'Rice', 'Chana Dal', 'Aloo Matar', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal Tadka', 'Chole', 'Pickle']
      },
      friday: {
        breakfast: ['Dhokla', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Rice', 'Dal', 'Paneer Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Veg Biryani', 'Dal Fry', 'Mix Veg', 'Raita']
      },
      saturday: {
        breakfast: ['Thepla', 'Tea', 'Fruit'],
        lunch: ['Puri', 'Rice', 'Dal', 'Aloo Curry', 'Salad', 'Buttermilk'],
        dinner: ['Roti', 'Rice', 'Dal', 'Matar Paneer', 'Papad']
      },
      sunday: {
        breakfast: ['Pav Bhaji', 'Tea', 'Fruit'],
        lunch: ['Roti', 'Jeera Rice', 'Special Dal', 'Shahi Paneer', 'Salad', 'Sweet'],
        dinner: ['Roti', 'Pulao', 'Dal Tadka', 'Seasonal Vegetable', 'Raita']
      }
    },
    rating: 4.7,
    reviews: 113,
    distanceToLandmark: '12 min walk to Judges Bungalow Road',
    nearbyPlaces: ['Judges Bungalow Road', 'Iskcon Temple', 'Vastrapur Lake', 'Science City'],
    contactInfo: {
      name: 'Rahul Shah',
      email: 'info@tranquilretreat.com',
      phone: '+91 92457 83601',
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
  { id: 'kitchen', name: 'Kitchen', icon: 'utensils' },
  { id: 'power-backup', name: 'Power Backup', icon: 'bolt' },
  { id: 'tv', name: 'TV Room', icon: 'tv' },
  { id: 'fridge', name: 'Refrigerator', icon: 'snowflake' },
  { id: 'water-purifier', name: 'Water Purifier', icon: 'tint' }
];

export const PRICE_RANGES = [
  { min: 0, max: 5000, label: 'Under ₹5,000' },
  { min: 5000, max: 7500, label: '₹5,000 - ₹7,500' },
  { min: 7500, max: 10000, label: '₹7,500 - ₹10,000' },
  { min: 10000, max: 15000, label: '₹10,000 - ₹15,000' },
  { min: 15000, max: 100000, label: '₹15,000+' }
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
  { id: 'pg', label: 'Paying Guest (PG)' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'shared-apartment', label: 'Shared Apartment' },
  { id: 'single-room', label: 'Single Room' },
  { id: 'dormitory', label: 'Dormitory' }
];

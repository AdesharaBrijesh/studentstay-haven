
import React from 'react';
import { MapPin, User, Bath } from 'lucide-react';
import { Property } from '../../lib/types';
import { getPropertyTypeLabel } from '../../utils/propertyUtils';
import PropertyColumn from './PropertyColumn';
import ComparisonSection from './ComparisonSection';
import ComparisonRow from './ComparisonRow';

interface ComparisonTableProps {
  properties: Property[];
  highlightDifferences: boolean;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  properties, 
  highlightDifferences 
}) => {
  return (
    <div className="overflow-x-auto pb-4">
      <table className="w-full border-collapse">
        {/* Sticky headers */}
        <thead className="sticky top-[120px] z-10">
          <tr>
            <th className="text-left p-4 bg-white border-b-2 border-gray-100 w-1/4 min-w-[200px]">Property</th>
            {properties.map((property) => (
              <th key={property.id} className="p-4 border-b-2 border-gray-100 bg-white min-w-[250px]">
                <PropertyColumn property={property} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {/* Basic Details */}
          <ComparisonSection title="Basic Details" />
          <ComparisonRow 
            label="Property Type"
            properties={properties}
            extractValue={(property) => getPropertyTypeLabel(property.type)}
            highlightDifferences={highlightDifferences}
          />
          <ComparisonRow 
            label="Location"
            properties={properties}
            extractValue={(property) => (
              <div className="flex items-center justify-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
                <span className="truncate">{property.location.address}</span>
              </div>
            )}
            highlightDifferences={highlightDifferences}
          />
          
          {/* Room Details */}
          <ComparisonSection title="Room Details" />
          <ComparisonRow 
            label="Room Type"
            properties={properties}
            extractValue={(property) => property.roomDetails.roomType === 'private' 
              ? 'Private Room' 
              : property.roomDetails.roomType === 'shared' 
                ? 'Shared Room' 
                : 'Studio'}
            highlightDifferences={highlightDifferences}
          />
          <ComparisonRow 
            label="Gender Policy"
            properties={properties}
            extractValue={(property) => (
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
            )}
            highlightDifferences={highlightDifferences}
          />
          <ComparisonRow 
            label="Rooms"
            properties={properties}
            extractValue={(property) => (
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
            )}
            highlightDifferences={highlightDifferences}
          />
          <ComparisonRow 
            label="Room Size"
            properties={properties}
            extractValue={(property) => (
              <>
                <span className="font-medium">{property.roomDetails.roomSize}</span> <span className="text-muted-foreground">sq ft</span>
              </>
            )}
            highlightDifferences={highlightDifferences}
          />
          
          {/* Amenities */}
          <ComparisonSection title="Amenities" />
          <ComparisonRow 
            label="Food Included"
            properties={properties}
            extractValue={(property) => property.foodMenu ? true : false}
            highlightDifferences={highlightDifferences}
            valueType="boolean"
          />
          
          {/* Get all unique amenities across all properties */}
          {Array.from(new Set(properties.flatMap(p => p.amenities))).map((amenity, index) => (
            <ComparisonRow 
              key={index}
              label={amenity}
              properties={properties}
              extractValue={(property) => property.amenities.includes(amenity)}
              highlightDifferences={highlightDifferences}
              valueType="boolean"
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;

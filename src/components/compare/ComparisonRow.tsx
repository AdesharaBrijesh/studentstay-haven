
import React from 'react';
import { Check, X } from 'lucide-react';
import { Property } from '../../lib/types';

interface ComparisonRowProps {
  label: string;
  properties: Property[];
  extractValue: (property: Property) => React.ReactNode;
  highlightDifferences: boolean;
  valueType?: 'text' | 'boolean';
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ 
  label, 
  properties, 
  extractValue, 
  highlightDifferences,
  valueType = 'text'
}) => {
  // Function to determine if values are the same across properties
  const areValuesSame = () => {
    if (properties.length <= 1) return false;
    const firstValue = extractValue(properties[0]);
    return properties.every(property => extractValue(property) === firstValue);
  };

  // Get cell background based on highlight setting and value sameness
  const getCellBackground = () => {
    if (!highlightDifferences) return "";
    return areValuesSame() ? "bg-gray-50" : "bg-blue-50";
  };

  // Render amenity status with check/x icons
  const renderBooleanValue = (value: React.ReactNode) => {
    return value ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-400" />;
  };

  return (
    <tr>
      <td className="p-4 border-b border-gray-100 font-medium bg-gray-50">{label}</td>
      {properties.map((property, index) => {
        const value = extractValue(property);
        return (
          <td 
            key={property.id} 
            className={`p-4 border-b border-gray-100 text-center align-middle ${getCellBackground()}`}
          >
            <div className="flex items-center justify-center w-full h-full">
              {valueType === 'boolean' ? renderBooleanValue(value) : value}
            </div>
          </td>
        );
      })}
    </tr>
  );
};

export default ComparisonRow;

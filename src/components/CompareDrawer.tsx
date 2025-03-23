import React from 'react';
import { X, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../lib/CompareContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Property } from '../lib/types';
import { getPropertyTypeLabel } from '../utils/propertyUtils';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({ isOpen, onClose }) => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 transition-transform">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold">
          Compare Properties ({compareList.length}/3)
        </h3>
        <div className="flex gap-2">
          {compareList.length > 0 && (
            <button 
              onClick={clearCompare}
              className="text-sm text-muted-foreground hover:text-gray-900"
            >
              Clear all
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {compareList.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          <p>Add properties to compare them side by side</p>
        </div>
      ) : (
        <div className="p-4">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
            {compareList.map((property) => (
              <ComparePropertyCard 
                key={property.id} 
                property={property} 
                onRemove={removeFromCompare} 
              />
            ))}
          </div>
          
          {compareList.length >= 2 && (
            <div className="mt-4 flex justify-center">
              <Link
                to="/compare"
                state={{ properties: compareList }}
                className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span>Compare Now</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ComparePropertyCardProps {
  property: Property;
  onRemove: (id: string) => void;
}

const ComparePropertyCard: React.FC<ComparePropertyCardProps> = ({ property, onRemove }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3 relative">
      <button
        onClick={() => onRemove(property.id)}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
        aria-label="Remove from compare"
      >
        <X className="h-3 w-3 text-gray-500" />
      </button>
      
      <div className="flex gap-3">
        <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={property.photos[0]} 
            alt={property.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow min-w-0">
          <h4 className="font-medium text-sm truncate">{property.name}</h4>
          <p className="text-xs text-muted-foreground mb-1">
            {getPropertyTypeLabel(property.type)}
          </p>
          
          <div className="flex items-center gap-1 mb-1">
            {property.rating && (
              <>
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium">{property.rating}</span>
              </>
            )}
          </div>
          
          <p className="text-sm font-semibold">₹{property.price} <span className="text-xs font-normal text-muted-foreground">/ month</span></p>
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;

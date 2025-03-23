
import React from 'react';
import { GitCompare } from 'lucide-react';
import { useCompare } from '../lib/CompareContext';
import { Property } from '../lib/types';

interface CompareButtonProps {
  property: Property;
}

const CompareButton: React.FC<CompareButtonProps> = ({ property }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(property.id);
  
  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };
  
  return (
    <button
      onClick={handleToggleCompare}
      className={`p-2 rounded-full transition-colors ${
        inCompare 
          ? 'bg-primary text-white hover:bg-primary/90' 
          : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
      aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
    >
      <GitCompare className="h-4 w-4" />
    </button>
  );
};

export default CompareButton;

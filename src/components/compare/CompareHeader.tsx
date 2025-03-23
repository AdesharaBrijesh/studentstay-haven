
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ArrowLeftRight } from 'lucide-react';

interface CompareHeaderProps {
  highlightDifferences: boolean;
  setHighlightDifferences: (value: boolean) => void;
}

const CompareHeader: React.FC<CompareHeaderProps> = ({ 
  highlightDifferences, 
  setHighlightDifferences 
}) => {
  return (
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
  );
};

export default CompareHeader;

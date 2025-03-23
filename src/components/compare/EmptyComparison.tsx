
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const EmptyComparison: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">No Properties to Compare</h1>
        <p className="text-muted-foreground mb-8">
          Please add properties to your comparison list first.
        </p>
        <Link
          to="/listings"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Browse Listings
        </Link>
      </div>
    </div>
  );
};

export default EmptyComparison;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { Property } from '../lib/types';
import CompareHeader from '../components/compare/CompareHeader';
import EmptyComparison from '../components/compare/EmptyComparison';
import ComparisonTable from '../components/compare/ComparisonTable';
import ScrollToTop from '../components/compare/ScrollToTop';

const Compare = () => {
  const location = useLocation();
  const { properties } = location.state as { properties: Property[] } || { properties: [] };
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);

  // Track scroll position to show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!properties || properties.length === 0) {
    return <EmptyComparison />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <CompareHeader 
        highlightDifferences={highlightDifferences} 
        setHighlightDifferences={setHighlightDifferences} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Compare Properties</h1>
        
        <ComparisonTable 
          properties={properties} 
          highlightDifferences={highlightDifferences} 
        />
      </div>
      
      <ScrollToTop visible={scrollVisible} />
      
      <Footer />
    </div>
  );
};

export default Compare;

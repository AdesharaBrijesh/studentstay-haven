
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Property } from './types';
import { toast } from 'sonner';

interface CompareContextType {
  compareList: Property[];
  addToCompare: (property: Property) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Property[]>([]);

  // Load compare list from localStorage on mount
  useEffect(() => {
    try {
      const savedList = localStorage.getItem('compareList');
      if (savedList) {
        setCompareList(JSON.parse(savedList));
      }
    } catch (error) {
      console.error('Failed to load compare list from localStorage:', error);
    }
  }, []);

  // Save compare list to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('compareList', JSON.stringify(compareList));
    } catch (error) {
      console.error('Failed to save compare list to localStorage:', error);
    }
  }, [compareList]);

  const addToCompare = (property: Property) => {
    if (compareList.length >= 3) {
      toast.error('Compare limit reached', {
        description: 'You can compare up to 3 properties at a time. Please remove one before adding another.'
      });
      return;
    }
    
    if (!compareList.find(p => p.id === property.id)) {
      setCompareList(prev => [...prev, property]);
      toast.success('Added to compare', {
        description: `${property.name} added to your comparison list.`
      });
    }
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
    toast.info('Removed from compare');
  };

  const clearCompare = () => {
    setCompareList([]);
    toast.info('Comparison list cleared');
  };

  const isInCompare = (propertyId: string) => {
    return compareList.some(p => p.id === propertyId);
  };

  return (
    <CompareContext.Provider 
      value={{ 
        compareList, 
        addToCompare, 
        removeFromCompare, 
        clearCompare, 
        isInCompare 
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

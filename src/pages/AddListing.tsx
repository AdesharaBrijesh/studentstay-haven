
import React from 'react';
import ListingForm from '../components/ListingForm';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { PropertyFormData } from '@/lib/types';

const AddListing = () => {
  const handleSubmit = (data: PropertyFormData) => {
    console.log('Form submitted:', data);
    toast.success('Property listing submitted successfully!');
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Add your PG, hostel, or rental accommodation to our platform and connect with thousands of people looking for a place to stay in Ahmedabad
          </p>
        </div>
        
        <ListingForm onSubmit={handleSubmit} />
      </div>
      
      <Footer />
    </div>
  );
};

export default AddListing;

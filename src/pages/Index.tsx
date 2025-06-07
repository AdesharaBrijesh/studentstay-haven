
import React from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { useProperties } from '../hooks/useProperties';
import { Link } from 'react-router-dom';

const Index = () => {
  const { data: properties = [], isLoading } = useProperties();
  
  // Get featured properties and limit to 6
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
  const recentProperties = properties.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium student accommodations
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link 
                  to="/listings" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  View All Properties
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No featured properties yet</h3>
              <p className="text-gray-600 mb-6">Check back later for our featured listings.</p>
              <Link 
                to="/listings" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Browse All Properties
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fresh listings from property owners across the city
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : recentProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link 
                  to="/listings" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  View All Properties
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties available</h3>
              <p className="text-gray-600 mb-6">Be the first to add a property listing!</p>
              <Link 
                to="/add-listing" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Add Your Property
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

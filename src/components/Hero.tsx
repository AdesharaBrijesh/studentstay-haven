
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState('Boston, MA');
  const heroRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/listings', { state: { searchTerm, location } });
  };

  useEffect(() => {
    if (heroRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(heroRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 pt-20 pb-16 sm:pb-24 md:pt-28 lg:pt-36">
      {/* Background graphic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5"></div>
        <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-primary/5"></div>
      </div>

      <div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 -translate-y-4 transition-all duration-1000 ease-out"
        ref={heroRef}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            Find your perfect <span className="text-primary">student accommodation</span> in Boston
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Discover affordable, comfortable places to stay while you focus on your education. 
            Browse PGs, hostels, and student housing options that match your needs.
          </p>

          <div className="mt-8 sm:mt-12">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-grow w-full sm:w-auto">
                <div className="flex items-center border bg-white border-input rounded-lg overflow-hidden shadow-sm hover:border-primary transition-colors duration-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
                  <div className="pl-4 pr-2 py-3 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select
                    className="w-full bg-transparent border-0 focus:ring-0 appearance-none text-foreground py-3 pr-4 cursor-pointer"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="Boston, MA">Boston, MA</option>
                    <option value="Cambridge, MA">Cambridge, MA</option>
                  </select>
                </div>
              </div>
              
              <div className="relative flex-grow w-full sm:w-auto">
                <div className="flex items-center border bg-white border-input rounded-lg overflow-hidden shadow-sm hover:border-primary transition-colors duration-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
                  <div className="pl-4 pr-2 py-3 flex-shrink-0">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="PG, hostel, or area..."
                    className="w-full border-0 focus:ring-0 text-foreground py-3 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-lg py-3 px-6 shadow-sm transition-all hover:shadow flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium text-foreground shadow-sm border border-gray-100">
              300+ Properties
            </div>
            <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium text-foreground shadow-sm border border-gray-100">
              Verified Listings
            </div>
            <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium text-foreground shadow-sm border border-gray-100">
              Student-Friendly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  MapPin, 
  Check,
  Wifi,
  Dumbbell,
  Book,
  Lock,
  Users,
  Home
} from 'lucide-react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { PROPERTIES } from '../lib/data';

const Index = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState(PROPERTIES.filter(p => p.featured));
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    featured: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      const howItWorksSection = document.getElementById('how-it-works');
      const featuredSection = document.getElementById('featured-properties');
      
      if (featuresSection) {
        const featuresPosition = featuresSection.getBoundingClientRect();
        setIsVisible(prev => ({
          ...prev,
          features: featuresPosition.top < window.innerHeight * 0.75
        }));
      }
      
      if (howItWorksSection) {
        const howItWorksPosition = howItWorksSection.getBoundingClientRect();
        setIsVisible(prev => ({
          ...prev,
          howItWorks: howItWorksPosition.top < window.innerHeight * 0.75
        }));
      }
      
      if (featuredSection) {
        const featuredPosition = featuredSection.getBoundingClientRect();
        setIsVisible(prev => ({
          ...prev,
          featured: featuredPosition.top < window.innerHeight * 0.75
        }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to check initial visibility
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Wifi className="h-6 w-6 text-primary" />,
      title: 'Verified Listings',
      description: 'Every property is verified by our team to ensure accuracy and quality.'
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-primary" />,
      title: 'Amenity Filters',
      description: 'Find places with the exact amenities you need for comfortable living.'
    },
    {
      icon: <Book className="h-6 w-6 text-primary" />,
      title: 'Student-Friendly',
      description: 'Properties close to educational institutions and designed for students.'
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: 'Secure Booking',
      description: 'Book your preferred accommodation with confidence and security.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Search Properties',
      description: 'Browse our extensive collection of student accommodations in Boston.'
    },
    {
      number: '02',
      title: 'Filter & Compare',
      description: 'Use our advanced filters to find the perfect match for your needs and budget.'
    },
    {
      number: '03',
      title: 'Schedule Viewing',
      description: 'Book a viewing directly through our platform at your convenience.'
    },
    {
      number: '04',
      title: 'Move In',
      description: 'Complete the booking process and move into your new student home.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section 
        id="features" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 transform ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              The Smarter Way to Find Student Housing
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              We make finding the perfect student accommodation easy, safe, and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-1000 transform ${
                  isVisible.features 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section 
        id="how-it-works" 
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 transform ${
              isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Find your perfect student accommodation in four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`relative transition-all duration-1000 transform ${
                  isVisible.howItWorks 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section 
        id="featured-properties" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-1000 transform ${
              isVisible.featured ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Featured Properties
              </h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Discover our handpicked selection of premium student accommodations
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => navigate('/listings')}
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <span className="font-medium">View All Properties</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property, index) => (
              <div 
                key={property.id}
                className={`transition-all duration-1000 transform ${
                  isVisible.featured 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              What Students Say
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Hear from students who found their perfect accommodation through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Emily Johnson',
                program: 'Business Administration',
                university: 'Boston University',
                text: 'Finding accommodation as an international student was incredibly stressful until I discovered StudentStay. The platform made it so easy to find a place that suited my needs and budget.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                program: 'Computer Science',
                university: 'MIT',
                text: 'The filtering options made it super easy to find exactly what I was looking for. I found a great shared apartment close to campus with all the amenities I needed.',
                rating: 4
              },
              {
                name: 'Sophia Rodriguez',
                program: 'Medicine',
                university: 'Harvard University',
                text: 'As a medical student with a tight schedule, I needed a quiet place close to the hospital. StudentStay helped me find the perfect studio apartment within my budget.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.program}, {testimonial.university}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Find Your Perfect Student Accommodation?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Browse through our extensive collection of PGs, hostels, and student housing options to find your ideal home away from home.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => navigate('/listings')}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Find Accommodation
                </button>
                <button 
                  onClick={() => navigate('/add-listing')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

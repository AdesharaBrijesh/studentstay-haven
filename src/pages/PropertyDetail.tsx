
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  User, 
  Bath, 
  ChevronLeft, 
  Phone, 
  Mail,
  Utensils
} from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import AmenitiesList from '../components/AmenitiesList';
import Map from '../components/Map';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { PROPERTIES } from '../lib/data';
import { Property } from '../lib/types';
import { toast } from 'sonner';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      const foundProperty = PROPERTIES.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleSaveProperty = () => {
    toast.success('Property saved!', {
      description: 'You can find this property in your saved listings.'
    });
  };

  const handleScheduleViewing = () => {
    setShowContactModal(true);
  };

  const getPropertyTypeLabel = (type: string) => {
    switch(type) {
      case 'student-housing':
        return 'Student Housing';
      case 'pg':
        return 'PG';
      case 'dormitory':
        return 'Dormitory';
      case 'shared-house':
        return 'Shared House';
      case 'shared-apartment':
        return 'Shared Apartment';
      case 'single-room':
        return 'Single Room';
      case 'hostel':
        return 'Hostel';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/listings"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/listings"
            className="inline-flex items-center text-muted-foreground hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Listings
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <ImageGallery images={property.photos} />
        
        {/* Property Title and Quick Info */}
        <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
            </div>
            <div className="flex flex-wrap items-center mt-3 gap-4">
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < (property.rating || 0) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{property.rating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({property.reviews} reviews)
                </span>
              </div>
              
              {property.distanceToLandmark && (
                <div className="text-muted-foreground flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  <span>{property.distanceToLandmark}</span>
                </div>
              )}
              
              <div className="text-muted-foreground flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                <span>{getPropertyTypeLabel(property.type)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-3xl font-bold text-gray-900">₹{property.price}</div>
            <div className="text-muted-foreground">per month</div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['overview', 'amenities', 'food', 'location', 'rules'].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap px-5 py-3 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {property.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-gray-500 text-sm mb-1">Room Type</div>
                      <div className="font-medium">
                        {property.roomDetails.roomType === 'private' 
                          ? 'Private Room' 
                          : property.roomDetails.roomType === 'shared' 
                            ? 'Shared Room' 
                            : 'Studio'}
                      </div>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-gray-500 text-sm mb-1">Gender Policy</div>
                      <div className="font-medium">
                        {property.roomDetails.genderPolicy === 'co-ed' 
                          ? 'Co-ed' 
                          : property.roomDetails.genderPolicy === 'male' 
                            ? 'Male Only' 
                            : 'Female Only'}
                      </div>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-gray-500 text-sm mb-1">Rooms</div>
                      <div className="font-medium">
                        {property.roomDetails.bedrooms} <User className="inline h-4 w-4" />  
                        {property.roomDetails.bathrooms} <Bath className="inline h-4 w-4" />
                      </div>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-gray-500 text-sm mb-1">Room Size</div>
                      <div className="font-medium">
                        {property.roomDetails.roomSize} sq ft
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Amenities</h2>
                    <button 
                      onClick={() => setActiveTab('amenities')}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      View All
                    </button>
                  </div>
                  
                  <AmenitiesList amenities={property.amenities} />
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Food Menu</h2>
                    <button 
                      onClick={() => setActiveTab('food')}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      View Full Menu
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Utensils className="h-5 w-5" />
                    <span className="font-medium">Daily Meals Included</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    Enjoy home-cooked fresh meals prepared daily. Our weekly menu is designed to provide balanced nutrition with a variety of Indian dishes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Breakfast</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Poha / Upma / Paratha</li>
                        <li>• Tea / Coffee</li>
                        <li>• Seasonal Fruit</li>
                      </ul>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Lunch</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Roti / Rice</li>
                        <li>• Dal / Sabzi</li>
                        <li>• Salad / Buttermilk</li>
                      </ul>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Dinner</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Roti / Rice</li>
                        <li>• Dal / Paneer</li>
                        <li>• Seasonal Vegetables</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Nearby Places</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {property.nearbyPlaces.map((place, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                          <span className="text-muted-foreground">{place}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">All Amenities</h2>
                <AmenitiesList amenities={property.amenities} showAll={true} />
              </div>
            )}

            {/* Food Menu Tab */}
            {activeTab === 'food' && property.foodMenu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Weekly Food Menu</h2>
                <p className="text-muted-foreground mb-6">
                  Our meal plan includes breakfast, lunch, and dinner all 7 days of the week. All meals are prepared fresh using quality ingredients.
                </p>
                
                <div className="space-y-6">
                  {Object.entries(property.foodMenu).map(([day, meals]) => (
                    <div key={day} className="border border-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-primary capitalize">{day}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Breakfast</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            {meals.breakfast.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Lunch</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            {meals.lunch.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Dinner</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            {meals.dinner.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">Special Dietary Requirements</h3>
                  <p className="text-sm text-yellow-700">
                    We can accommodate specific dietary requirements with advance notice. Please discuss your needs with the property manager.
                  </p>
                </div>
              </div>
            )}
            
            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="h-[400px] rounded-lg overflow-hidden mb-6">
                  <Map 
                    coordinates={property.location.coordinates} 
                    zoom={15}
                    interactive={true}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Address</h3>
                  <p className="text-muted-foreground">
                    {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
                  </p>
                </div>
                
                {property.distanceToLandmark && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="font-medium text-lg mb-3">Distance to Key Locations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{property.distanceToLandmark.split(" to ")[1]}</p>
                          <p className="text-sm text-muted-foreground">{property.distanceToLandmark}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Rules Tab */}
            {activeTab === 'rules' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">House Rules</h2>
                
                {property.rules.length > 0 ? (
                  <ul className="space-y-3">
                    {property.rules.map((rule, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary text-xs">•</span>
                        </div>
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No specific rules have been listed for this property.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
              {/* Contact Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={handleScheduleViewing}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Schedule Viewing
                </button>
                
                <button 
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                  className="w-full py-3 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {showPhoneNumber 
                    ? (property.contactInfo?.phone || '+91 98765 43210') 
                    : 'Show Phone Number'
                  }
                </button>
                
                <a 
                  href={`mailto:${property.contactInfo?.email || 'info@stayhome.com'}`}
                  className="w-full py-3 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
                
                <button 
                  onClick={handleSaveProperty}
                  className="w-full py-3 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Save to Favorites
                </button>
              </div>
              
              {/* Property Manager */}
              {property.contactInfo && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium mb-4">Property Manager</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {property.contactInfo.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{property.contactInfo.name}</p>
                      {property.contactInfo.responseTime && (
                        <p className="text-sm text-muted-foreground">
                          Response time: {property.contactInfo.responseTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional Information */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-muted-foreground">
                  This property is listed and verified on StayHome. We recommend that you schedule a viewing before making any payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-6">Contact Property Manager</h3>
            <ContactForm propertyId={property.id} propertyName={property.name} />
            <button 
              className="mt-4 text-muted-foreground hover:text-gray-900 transition-colors text-sm"
              onClick={() => setShowContactModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;

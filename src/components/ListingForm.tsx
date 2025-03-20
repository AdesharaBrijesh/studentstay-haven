
import React, { useState } from 'react';
import { 
  Loader2, Upload, X, Check 
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  AMENITIES, 
  PROPERTY_TYPES, 
  ROOM_TYPES, 
  GENDER_POLICIES 
} from '../lib/data';

interface ListingFormProps {
  onSubmit: (data: any) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: '',
    location: {
      address: '',
      city: 'Boston',
      state: 'MA',
      zipCode: '',
      coordinates: [42.3601, -71.0589] as [number, number]
    },
    roomDetails: {
      roomType: '',
      bedrooms: '',
      bathrooms: '',
      genderPolicy: '',
      maxOccupancy: '',
      roomSize: ''
    },
    amenities: [] as string[],
    rules: [] as string[],
    photos: [] as string[],
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => {
      if (prev.amenities.includes(amenityId)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(id => id !== amenityId)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenityId]
        };
      }
    });
  };

  const handleRuleAdd = (rule: string) => {
    if (rule.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, rule.trim()]
      }));
    }
  };

  const handleRuleRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handlePhotoAdd = (photoUrl: string) => {
    if (photoUrl.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, photoUrl.trim()]
      }));
    }
  };

  const handlePhotoRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 1500);
  };

  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Room Details' },
    { id: 3, name: 'Amenities & Rules' },
    { id: 4, name: 'Photos & Contact' },
    { id: 5, name: 'Review' }
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      {/* Progress Steps */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <div className="ml-2">
                <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-16 sm:w-24 h-px bg-gray-200 mx-2 sm:mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleFormSubmit}>
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Basic Property Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type*
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                  required
                >
                  <option value="">Select Property Type</option>
                  {PROPERTY_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rent (USD)*
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
                placeholder="Street Address"
                required
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <select
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                    required
                  >
                    <option value="Boston">Boston</option>
                    <option value="Cambridge">Cambridge</option>
                    <option value="Somerville">Somerville</option>
                  </select>
                </div>
                
                <div>
                  <select
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                    required
                  >
                    <option value="MA">Massachusetts</option>
                  </select>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="location.zipCode"
                    value={formData.location.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Zip Code"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Room Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Room Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type*
                </label>
                <select
                  name="roomDetails.roomType"
                  value={formData.roomDetails.roomType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                  required
                >
                  <option value="">Select Room Type</option>
                  {ROOM_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender Policy*
                </label>
                <select
                  name="roomDetails.genderPolicy"
                  value={formData.roomDetails.genderPolicy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                  required
                >
                  <option value="">Select Gender Policy</option>
                  {GENDER_POLICIES.map(policy => (
                    <option key={policy.id} value={policy.id}>{policy.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms*
                </label>
                <input
                  type="number"
                  name="roomDetails.bedrooms"
                  value={formData.roomDetails.bedrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms*
                </label>
                <input
                  type="number"
                  name="roomDetails.bathrooms"
                  value={formData.roomDetails.bathrooms}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Size (sq ft)*
                </label>
                <input
                  type="number"
                  name="roomDetails.roomSize"
                  value={formData.roomDetails.roomSize}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Occupancy*
                </label>
                <input
                  type="number"
                  name="roomDetails.maxOccupancy"
                  value={formData.roomDetails.maxOccupancy}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Amenities & Rules */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Amenities & Rules</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {AMENITIES.map(amenity => (
                  <label
                    key={amenity.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                      formData.amenities.includes(amenity.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-full mr-3 ${
                        formData.amenities.includes(amenity.id)
                          ? 'bg-primary text-white'
                          : 'bg-gray-200'
                      }`}>
                        {formData.amenities.includes(amenity.id) && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        formData.amenities.includes(amenity.id)
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-700'
                      }`}>
                        {amenity.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                House Rules
              </label>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  id="new-rule"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter a rule (e.g., No smoking)"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-rule') as HTMLInputElement;
                    handleRuleAdd(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              
              {formData.rules.length > 0 ? (
                <ul className="space-y-2">
                  {formData.rules.map((rule, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
                      <span className="text-gray-700">{rule}</span>
                      <button
                        type="button"
                        onClick={() => handleRuleRemove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">No rules added yet.</p>
              )}
            </div>
          </div>
        )}
        
        {/* Step 4: Photos & Contact */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Photos & Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Photos
              </label>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  id="new-photo"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-photo') as HTMLInputElement;
                    handlePhotoAdd(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              
              {formData.photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md opacity-70 hover:opacity-100"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Add photo URLs to display your property images</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name*
                </label>
                <input
                  type="text"
                  name="contactInfo.name"
                  value={formData.contactInfo.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email*
                </label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone*
                </label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Review Your Listing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Type:</span> {
                    PROPERTY_TYPES.find(t => t.id === formData.type)?.label || formData.type
                  }</p>
                  <p><span className="font-medium">Price:</span> ${formData.price}/month</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>{formData.location.address}</p>
                  <p>{formData.location.city}, {formData.location.state} {formData.location.zipCode}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Room Details</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p><span className="font-medium">Room Type:</span> {
                    ROOM_TYPES.find(t => t.id === formData.roomDetails.roomType)?.label || formData.roomDetails.roomType
                  }</p>
                  <p><span className="font-medium">Gender Policy:</span> {
                    GENDER_POLICIES.find(p => p.id === formData.roomDetails.genderPolicy)?.label || formData.roomDetails.genderPolicy
                  }</p>
                  <p><span className="font-medium">Size:</span> {formData.roomDetails.roomSize} sq ft</p>
                  <p><span className="font-medium">Bedrooms:</span> {formData.roomDetails.bedrooms}</p>
                  <p><span className="font-medium">Bathrooms:</span> {formData.roomDetails.bathrooms}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Amenities</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  {formData.amenities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map(amenityId => {
                        const amenity = AMENITIES.find(a => a.id === amenityId);
                        return amenity ? (
                          <span key={amenityId} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                            {amenity.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No amenities selected</p>
                  )}
                </div>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-2">Photos</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {formData.rules.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">House Rules</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1">
                      {formData.rules.map((rule, index) => (
                        <li key={index} className="text-gray-700">{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p><span className="font-medium">Name:</span> {formData.contactInfo.name}</p>
                  <p><span className="font-medium">Email:</span> {formData.contactInfo.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.contactInfo.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 mb-4">
                By submitting this listing, you confirm that all information provided is accurate and that you have the right to list this property.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Listing'
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        {currentStep !== 5 && (
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ListingForm;

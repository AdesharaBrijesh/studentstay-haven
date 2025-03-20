
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft,
  MapPin,
  Home,
  DollarSign,
  User,
  Bath,
  Users,
  Ruler,
  AlignLeft
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { 
  AMENITIES, 
  PROPERTY_TYPES, 
  ROOM_TYPES, 
  GENDER_POLICIES 
} from '../lib/data';

interface ListingFormProps {
  onSubmit?: (data: any) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    location: {
      address: '',
      city: 'Boston',
      state: 'MA',
      zipCode: ''
    },
    roomDetails: {
      roomType: '',
      bedrooms: '',
      bathrooms: '',
      genderPolicy: '',
      maxOccupancy: '',
      roomSize: '',
    },
    amenities: [] as string[],
    rules: [] as string[],
    photos: [] as File[],
    description: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Steps configuration
  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Room Details' },
    { id: 3, name: 'Amenities' },
    { id: 4, name: 'Photos & Description' },
    { id: 5, name: 'House Rules' },
    { id: 6, name: 'Contact Info' },
    { id: 7, name: 'Review' }
  ];

  // Manage file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files as FileList)]
      }));
    }
  };

  // Remove uploaded photo
  const removePhoto = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear any existing error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'amenities' | 'rules'
  ) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item) => item !== value)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form based on current step
    if (validateCurrentStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setLoading(true);
        
        // Simulate API submission
        setTimeout(() => {
          setLoading(false);
          toast.success('Listing submitted successfully!', {
            description: 'Your property will be reviewed by our team and published soon.'
          });
          
          if (onSubmit) {
            onSubmit(formData);
          }
          
          // Reset form after successful submission
          setFormData({
            name: '',
            type: '',
            price: '',
            location: {
              address: '',
              city: 'Boston',
              state: 'MA',
              zipCode: ''
            },
            roomDetails: {
              roomType: '',
              bedrooms: '',
              bathrooms: '',
              genderPolicy: '',
              maxOccupancy: '',
              roomSize: '',
            },
            amenities: [],
            rules: [],
            photos: [],
            description: '',
            contactInfo: {
              name: '',
              email: '',
              phone: ''
            },
            termsAccepted: false
          });
          setCurrentStep(1);
        }, 2000);
      }
    }
  };

  // Validate current step
  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic Info validation
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Property name is required';
      if (!formData.type) newErrors.type = 'Property type is required';
      if (!formData.price) newErrors.price = 'Price is required';
      if (!formData.location.address.trim()) newErrors['location.address'] = 'Address is required';
      if (!formData.location.zipCode.trim()) newErrors['location.zipCode'] = 'Zip code is required';
    }
    
    // Room Details validation
    else if (currentStep === 2) {
      if (!formData.roomDetails.roomType) newErrors['roomDetails.roomType'] = 'Room type is required';
      if (!formData.roomDetails.bedrooms) newErrors['roomDetails.bedrooms'] = 'Number of bedrooms is required';
      if (!formData.roomDetails.bathrooms) newErrors['roomDetails.bathrooms'] = 'Number of bathrooms is required';
      if (!formData.roomDetails.genderPolicy) newErrors['roomDetails.genderPolicy'] = 'Gender policy is required';
      if (!formData.roomDetails.maxOccupancy) newErrors['roomDetails.maxOccupancy'] = 'Maximum occupancy is required';
    }
    
    // Amenities validation (not strictly required)
    
    // Photos & Description validation
    else if (currentStep === 4) {
      if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }
    
    // House Rules validation (not strictly required)
    
    // Contact Info validation
    else if (currentStep === 6) {
      if (!formData.contactInfo.name.trim()) newErrors['contactInfo.name'] = 'Contact name is required';
      if (!formData.contactInfo.email.trim()) newErrors['contactInfo.email'] = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.contactInfo.email)) newErrors['contactInfo.email'] = 'Please enter a valid email';
      if (!formData.contactInfo.phone.trim()) newErrors['contactInfo.phone'] = 'Phone number is required';
    }
    
    // Review validation
    else if (currentStep === 7) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Steps indicator */}
      <div className="mb-8 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <div className="hidden sm:block ml-2">
                <p className="text-sm font-medium text-gray-700">{step.name}</p>
              </div>
              {step.id !== steps.length && (
                <div className="w-8 sm:w-16 h-px bg-gray-200 mx-2 sm:mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Property Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                  placeholder="e.g. Sunshine Student Living"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.type ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                >
                  <option value="">Select Type</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="10"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.price ? 'border-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                    placeholder="e.g. 850"
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="w-full h-[200px] rounded-lg mb-4 bg-gray-100 flex items-center justify-center" ref={mapRef}>
                <div className="text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Map view placeholder</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors['location.address'] ? 'border-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                  />
                  {errors['location.address'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['location.address']}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="location.zipCode"
                    value={formData.location.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors['location.zipCode'] ? 'border-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                  />
                  {errors['location.zipCode'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['location.zipCode']}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Room Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Room Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>
                <select
                  name="roomDetails.roomType"
                  value={formData.roomDetails.roomType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors['roomDetails.roomType'] ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                >
                  <option value="">Select Type</option>
                  {ROOM_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors['roomDetails.roomType'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['roomDetails.roomType']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender Policy
                </label>
                <select
                  name="roomDetails.genderPolicy"
                  value={formData.roomDetails.genderPolicy}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors['roomDetails.genderPolicy'] ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                >
                  <option value="">Select Policy</option>
                  {GENDER_POLICIES.map((policy) => (
                    <option key={policy.id} value={policy.id}>
                      {policy.label}
                    </option>
                  ))}
                </select>
                {errors['roomDetails.genderPolicy'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['roomDetails.genderPolicy']}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="roomDetails.bedrooms"
                    value={formData.roomDetails.bedrooms}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors['roomDetails.bedrooms'] ? 'border-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                    placeholder="e.g. 2"
                  />
                </div>
                {errors['roomDetails.bedrooms'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['roomDetails.bedrooms']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bath className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="roomDetails.bathrooms"
                    value={formData.roomDetails.bathrooms}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors['roomDetails.bathrooms'] ? 'border-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                    placeholder="e.g. 1.5"
                  />
                </div>
                {errors['roomDetails.bathrooms'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['roomDetails.bathrooms']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Occupancy
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="roomDetails.maxOccupancy"
                    value={formData.roomDetails.maxOccupancy}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors['roomDetails.maxOccupancy'] ? 'border-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                    placeholder="e.g. 2"
                  />
                </div>
                {errors['roomDetails.maxOccupancy'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['roomDetails.maxOccupancy']}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Size (sq ft)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="roomDetails.roomSize"
                  value={formData.roomDetails.roomSize}
                  onChange={handleChange}
                  min="0"
                  step="10"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  placeholder="e.g. 250"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Amenities */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Amenities</h2>
            <p className="text-gray-600 mb-6">Select all amenities that are available at your property</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {AMENITIES.map((amenity) => (
                <label 
                  key={amenity.id} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.amenities.includes(amenity.id)
                      ? 'bg-primary/5 border-primary/30'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={formData.amenities.includes(amenity.id)}
                    value={amenity.id}
                    onChange={(e) => handleCheckboxChange(e, 'amenities')}
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">{amenity.name}</span>
                  </div>
                </label>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Note: The amenities you select will be displayed on your property listing
            </p>
          </div>
        )}

        {/* Step 4: Photos & Description */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Photos & Description</h2>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Property Photos</p>
              <div 
                className={`border-2 border-dashed ${
                  errors.photos ? 'border-red-300' : 'border-gray-300'
                } rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-1">Drag and drop your photos here, or click to select files</p>
                  <p className="text-gray-500 text-sm">
                    Recommended: Upload at least 5 high-quality photos
                  </p>
                </div>
              </div>
              {errors.photos && <p className="mt-1 text-sm text-red-600">{errors.photos}</p>}
              
              {formData.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-28">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-3.5 w-3.5 text-gray-700" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                  placeholder="Describe your property in detail. Include information about the location, features, nearby amenities, etc."
                ></textarea>
              </div>
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              <p className="text-sm text-gray-500 mt-2">
                A detailed description helps students make informed decisions about your property
              </p>
            </div>
          </div>
        )}

        {/* Step 5: House Rules */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">House Rules</h2>
            <p className="text-gray-600 mb-6">
              Specify any rules that tenants must follow while staying at your property
            </p>
            
            <div className="space-y-4">
              {['No smoking', 'No pets', 'No parties', 'Quiet hours', 'No overnight guests', 'No alcohol'].map((rule) => (
                <label 
                  key={rule} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.rules.includes(rule)
                      ? 'bg-primary/5 border-primary/30'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={formData.rules.includes(rule)}
                    value={rule}
                    onChange={(e) => handleCheckboxChange(e, 'rules')}
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">{rule}</span>
                  </div>
                </label>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Add Custom Rules</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a custom rule and press Enter"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        const value = input.value.trim();
                        
                        if (value && !formData.rules.includes(value)) {
                          setFormData((prev) => ({
                            ...prev,
                            rules: [...prev.rules, value]
                          }));
                          input.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Contact Info */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              Provide your contact details so interested students can reach out
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                name="contactInfo.name"
                value={formData.contactInfo.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors['contactInfo.name'] ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                placeholder="e.g. John Smith"
              />
              {errors['contactInfo.name'] && (
                <p className="mt-1 text-sm text-red-600">{errors['contactInfo.name']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors['contactInfo.email'] ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                placeholder="e.g. john@example.com"
              />
              {errors['contactInfo.email'] && (
                <p className="mt-1 text-sm text-red-600">{errors['contactInfo.email']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors['contactInfo.phone'] ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                placeholder="e.g. (555) 123-4567"
              />
              {errors['contactInfo.phone'] && (
                <p className="mt-1 text-sm text-red-600">{errors['contactInfo.phone']}</p>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                Your contact information will be visible to registered users who are interested in your property
              </p>
            </div>
          </div>
        )}

        {/* Step 7: Review */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Listing</h2>
            
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Property Information</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Property Name</p>
                    <p className="font-medium">{formData.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">
                      {PROPERTY_TYPES.find(t => t.id === formData.type)?.label || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Rent</p>
                    <p className="font-medium">${formData.price || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">
                      {formData.location.address}, {formData.location.city}, {formData.location.state} {formData.location.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Room Details</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-medium">
                      {ROOM_TYPES.find(t => t.id === formData.roomDetails.roomType)?.label || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender Policy</p>
                    <p className="font-medium">
                      {GENDER_POLICIES.find(p => p.id === formData.roomDetails.genderPolicy)?.label || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms / Bathrooms</p>
                    <p className="font-medium">
                      {formData.roomDetails.bedrooms || '0'} bed / {formData.roomDetails.bathrooms || '0'} bath
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room Size</p>
                    <p className="font-medium">
                      {formData.roomDetails.roomSize || '0'} sq ft
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Amenities & Rules</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.length > 0 ? (
                      formData.amenities.map((amenity) => (
                        <span 
                          key={amenity} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {AMENITIES.find(a => a.id === amenity)?.name || amenity}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No amenities selected</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">House Rules</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.rules.length > 0 ? (
                      formData.rules.map((rule) => (
                        <span 
                          key={rule} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {rule}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No rules specified</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => 
                    setFormData({ ...formData, termsAccepted: e.target.checked })
                  }
                  className={`rounded border-gray-300 text-primary focus:ring-primary mt-1`}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I confirm that all the information provided is accurate and I agree to the 
                  <a href="#" className="text-primary ml-1">Terms of Service</a> and 
                  <a href="#" className="text-primary ml-1">Privacy Policy</a>.
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
          )}
          
          {currentStep < steps.length ? (
            <button
              type="submit"
              className="flex items-center px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150 ml-auto"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150 ml-auto disabled:opacity-70"
            >
              {loading ? (
                <>Submitting...</>
              ) : (
                <>Submit Listing</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ListingForm;

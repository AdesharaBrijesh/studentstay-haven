
import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  Input, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  Textarea, 
  Checkbox
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PROPERTY_TYPES, ROOM_TYPES, GENDER_POLICIES, AMENITIES } from '../lib/data';
import { PropertyFormData } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, { message: "Property name is required" }),
  type: z.string().min(1, { message: "Property type is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  address: z.string().min(2, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(2, { message: "Zip code is required" }),
  roomType: z.string().min(1, { message: "Room type is required" }),
  bedrooms: z.string().min(1, { message: "Number of bedrooms is required" }),
  bathrooms: z.string().min(1, { message: "Number of bathrooms is required" }),
  genderPolicy: z.string().min(1, { message: "Gender policy is required" }),
  maxOccupancy: z.string().min(1, { message: "Max occupancy is required" }),
  roomSize: z.string().min(1, { message: "Room size is required" }),
  amenities: z.array(z.string()).min(1, { message: "Select at least one amenity" }),
  rules: z.array(z.string()),
  description: z.string().min(20, { message: "Detailed description is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  contactEmail: z.string().email({ message: "Valid email is required" }),
  contactPhone: z.string().min(10, { message: "Valid phone number is required" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms" })
});

interface ListingFormProps {
  onSubmit: (data: PropertyFormData) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      price: '',
      address: '',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '',
      roomType: '',
      bedrooms: '',
      bathrooms: '',
      genderPolicy: '',
      maxOccupancy: '',
      roomSize: '',
      amenities: [],
      rules: [],
      description: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      termsAccepted: false
    }
  });

  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Room Details' },
    { id: 3, name: 'Amenities & Rules' },
    { id: 4, name: 'Photos' },
    { id: 5, name: 'Food Menu' },
    { id: 6, name: 'Contact Info' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  const handleRuleAdd = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule('');
    }
  };

  const handleRuleRemove = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const goToNextStep = () => {
    const fieldsToValidate: Record<number, string[]> = {
      1: ['name', 'type', 'price', 'address', 'city', 'state', 'zipCode', 'description'],
      2: ['roomType', 'bedrooms', 'bathrooms', 'genderPolicy', 'maxOccupancy', 'roomSize'],
      3: ['amenities'],
      5: ['contactName', 'contactEmail', 'contactPhone', 'termsAccepted']
    };

    const currentFields = fieldsToValidate[currentStep];
    
    if (currentFields) {
      form.trigger(currentFields as any).then(isValid => {
        if (isValid) setCurrentStep(prev => prev + 1);
      });
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmitForm = (values: z.infer<typeof formSchema>) => {
    const formData: PropertyFormData = {
      name: values.name,
      type: values.type,
      price: values.price,
      location: {
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      roomDetails: {
        roomType: values.roomType,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        genderPolicy: values.genderPolicy,
        maxOccupancy: values.maxOccupancy,
        roomSize: values.roomSize,
      },
      amenities: values.amenities,
      rules: rules,
      photos: photos,
      description: values.description,
      contactInfo: {
        name: values.contactName,
        email: values.contactEmail,
        phone: values.contactPhone,
      },
      termsAccepted: values.termsAccepted
    };

    onSubmit(formData);
  };

  return (
    <div className="space-y-8">
      <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step.id}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-900">{step.name}</p>
              </div>
              {step.id !== steps.length && (
                <div className="w-12 h-px bg-gray-200 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PROPERTY_TYPES.map(type => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="min-h-[120px]" 
                            placeholder="Provide a detailed description of your property..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Room Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ROOM_TYPES.map(type => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="genderPolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender Policy</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select policy" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {GENDER_POLICIES.map(policy => (
                                <SelectItem key={policy.id} value={policy.id}>
                                  {policy.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxOccupancy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Occupancy</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="roomSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Size (sq ft)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Amenities & Rules */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amenities</FormLabel>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          {AMENITIES.map(amenity => (
                            <div key={amenity.id} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value.includes(amenity.id)}
                                onCheckedChange={checked => {
                                  if (checked) {
                                    field.onChange([...field.value, amenity.id]);
                                  } else {
                                    field.onChange(field.value.filter(value => value !== amenity.id));
                                  }
                                }}
                                id={`amenity-${amenity.id}`}
                              />
                              <label 
                                htmlFor={`amenity-${amenity.id}`}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {amenity.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>House Rules</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newRule}
                        onChange={e => setNewRule(e.target.value)}
                        placeholder="Add a house rule"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={handleRuleAdd}
                        variant="outline"
                      >
                        Add Rule
                      </Button>
                    </div>

                    {rules.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {rules.map((rule, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span>{rule}</span>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRuleRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                </div>
              )}

              {/* Step 4: Photos */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <FormItem>
                    <FormLabel>Property Photos</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="photo-upload"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer block">
                        <div className="text-4xl text-gray-400 mb-4">📷</div>
                        <p className="text-gray-600">Drag and drop your photos here, or click to select files</p>
                      </label>
                    </div>

                    {photos.length > 0 && (
                      <div className="mt-6 grid grid-cols-4 gap-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt=""
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                setPhotos(photos.filter((_, i) => i !== index));
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                </div>
              )}

              {/* Step 5: Food Menu */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Weekly Food Menu</h3>
                  <p className="text-sm text-gray-500">Please provide details about your meal plan. This information will be displayed to potential residents.</p>
                  
                  <div className="space-y-6">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">{day}</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <FormLabel>Breakfast</FormLabel>
                            <Textarea placeholder="Poha, Tea, Fruit, etc." />
                          </div>
                          <div>
                            <FormLabel>Lunch</FormLabel>
                            <Textarea placeholder="Roti, Rice, Dal, Sabzi, etc." />
                          </div>
                          <div>
                            <FormLabel>Dinner</FormLabel>
                            <Textarea placeholder="Roti, Rice, Dal, Sabzi, etc." />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Contact Info */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions and privacy policy
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={goToPreviousStep}
                    variant="outline"
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < steps.length && (
                  <Button
                    type="button"
                    onClick={goToNextStep}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                )}
                
                {currentStep === steps.length && (
                  <Button type="submit" className="ml-auto">
                    Submit Listing
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ListingForm;

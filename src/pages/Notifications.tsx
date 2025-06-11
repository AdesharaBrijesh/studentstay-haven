
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Check, X, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  property_id?: string;
  data?: any;
}

interface Property {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  status: string;
  property_locations: any[];
  room_details: any[];
  contact_info: any[];
}

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchNotifications();
  }, [user, navigate]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const viewPropertyDetails = async (propertyId: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_locations(*),
          room_details(*),
          contact_info(*)
        `)
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      setSelectedProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
      toast.error('Failed to load property details');
    }
  };

  const approveProperty = async (propertyId: string) => {
    try {
      await supabase
        .from('properties')
        .update({ status: 'approved' })
        .eq('id', propertyId);

      toast.success('Property approved successfully!');
      setSelectedProperty(null);
      fetchNotifications();
    } catch (error) {
      console.error('Error approving property:', error);
      toast.error('Failed to approve property');
    }
  };

  const rejectProperty = async (propertyId: string) => {
    try {
      await supabase
        .from('properties')
        .update({ status: 'rejected' })
        .eq('id', propertyId);

      toast.success('Property rejected');
      setSelectedProperty(null);
      fetchNotifications();
    } catch (error) {
      console.error('Error rejecting property:', error);
      toast.error('Failed to reject property');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg p-6 border-l-4 ${
                  notification.read ? 'border-gray-300' : 'border-primary'
                } ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {notification.property_id && (
                      <button
                        onClick={() => viewPropertyDetails(notification.property_id!)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                        title="Mark as Read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Property Review</h2>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedProperty.name}</h3>
                    <p className="text-gray-600">{selectedProperty.type}</p>
                    <p className="text-lg font-semibold">₹{selectedProperty.price}/month</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-700">{selectedProperty.description}</p>
                  </div>

                  {selectedProperty.property_locations?.[0] && (
                    <div>
                      <h4 className="font-medium mb-2">Location</h4>
                      <p className="text-gray-700">
                        {selectedProperty.property_locations[0].address}, {selectedProperty.property_locations[0].city}
                      </p>
                    </div>
                  )}

                  {selectedProperty.room_details?.[0] && (
                    <div>
                      <h4 className="font-medium mb-2">Room Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <p>Type: {selectedProperty.room_details[0].room_type}</p>
                        <p>Bedrooms: {selectedProperty.room_details[0].bedrooms}</p>
                        <p>Bathrooms: {selectedProperty.room_details[0].bathrooms}</p>
                        <p>Max Occupancy: {selectedProperty.room_details[0].max_occupancy}</p>
                      </div>
                    </div>
                  )}

                  {selectedProperty.contact_info?.[0] && (
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="text-sm space-y-1">
                        <p>Name: {selectedProperty.contact_info[0].name}</p>
                        <p>Email: {selectedProperty.contact_info[0].email}</p>
                        <p>Phone: {selectedProperty.contact_info[0].phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedProperty.status === 'pending' && (
                  <div className="flex gap-4 mt-6 pt-6 border-t">
                    <button
                      onClick={() => approveProperty(selectedProperty.id)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectProperty(selectedProperty.id)}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;

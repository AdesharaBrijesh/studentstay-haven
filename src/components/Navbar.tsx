
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Menu, X, User, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUnreadNotifications();
      
      // Subscribe to notification changes
      const channel = supabase
        .channel('notifications-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchUnreadNotifications();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchUnreadNotifications = async () => {
    if (!user) return;
    
    try {
      const { count } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);
      
      setUnreadCount(count || 0);
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium">StudentStay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/listings" className="text-muted-foreground hover:text-primary transition-colors">
              Listings
            </Link>
            <Link to="/add-listing" className="text-muted-foreground hover:text-primary transition-colors">
              Add Listing
            </Link>
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <Link
                  to="/notifications"
                  className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={closeMenu}
              >
                Listings
              </Link>
              <Link
                to="/add-listing"
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={closeMenu}
              >
                Add Listing
              </Link>
              
              {user ? (
                <>
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors py-2 text-left">
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </button>
                  <Link
                    to="/notifications"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={closeMenu}
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={closeMenu}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

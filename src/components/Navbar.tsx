
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, User, Search, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/listings' },
    { name: 'Add Listing', path: '/add-listing' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Don't render navbar on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-subtle' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 transition-opacity duration-300 hover:opacity-80"
          >
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium bg-clip-text text-foreground">
              StudentStay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-200 px-1 py-2 hover:text-primary ${
                  isActive(link.path) 
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full' 
                    : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/listings" 
              className="hidden md:flex items-center p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-secondary transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
            </Link>
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <Link 
                to="/profile" 
                className="flex items-center p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-secondary transition-colors duration-200"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-secondary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 animate-slide-down">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-4 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(link.path) 
                      ? 'text-primary bg-primary/5' 
                      : 'text-foreground hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {!loading && !user && (
                <Link
                  to="/auth"
                  className="block px-3 py-4 rounded-md text-base font-medium text-foreground hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                >
                  Login / Sign Up
                </Link>
              )}
              
              {user && (
                <Link
                  to="/profile"
                  className="block px-3 py-4 rounded-md text-base font-medium text-foreground hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                >
                  My Profile
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;


import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import AddListing from './pages/AddListing';
import NotFound from './pages/NotFound';
import Compare from './pages/Compare';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import CompareDrawer from './components/CompareDrawer';
import { CompareProvider } from './lib/CompareContext';
import { GitCompare } from 'lucide-react';
import { Toaster } from 'sonner';

function App() {
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  
  return (
    <AuthProvider>
      <CompareProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Compare Toggle Button */}
          <button
            onClick={() => setShowCompareDrawer(!showCompareDrawer)}
            className="fixed bottom-5 right-5 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Toggle compare drawer"
          >
            <GitCompare className="h-5 w-5" />
          </button>
          
          <CompareDrawer 
            isOpen={showCompareDrawer} 
            onClose={() => setShowCompareDrawer(false)} 
          />
          
          <Toaster position="top-right" />
        </Router>
      </CompareProvider>
    </AuthProvider>
  );
}

export default App;

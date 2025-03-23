
import React from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  visible: boolean;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ visible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-5 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTop;

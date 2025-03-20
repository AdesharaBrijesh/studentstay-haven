
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreen(!fullscreen);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
  };

  return (
    <div className="relative">
      {/* Main Gallery View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[500px] overflow-hidden rounded-xl">
        <div 
          className="relative h-full w-full cursor-pointer overflow-hidden"
          onClick={toggleFullscreen}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Property ${currentIndex + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="hidden md:grid grid-cols-2 gap-2 h-full">
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index + 1} 
              className="relative h-full w-full cursor-pointer overflow-hidden"
              onClick={() => {
                setCurrentIndex(index + 1);
                setFullscreen(true);
              }}
            >
              <img 
                src={image} 
                alt={`Property ${index + 2}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <p className="text-white text-xl font-medium">+{images.length - 5} more</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white transition-colors z-10"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white transition-colors z-10"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <button
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white transition-colors z-10"
          onClick={toggleFullscreen}
          aria-label="View fullscreen"
        >
          <Maximize className="h-5 w-5" />
        </button>
      </div>
      
      {/* Image Thumbnails */}
      <div className="hidden md:flex mt-4 space-x-2 overflow-x-auto">
        {images.slice(0, 7).map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 rounded-md overflow-hidden h-20 w-20 ${
              currentIndex === index ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
        {images.length > 7 && (
          <button
            className="flex-shrink-0 rounded-md overflow-hidden h-20 w-20 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            onClick={toggleFullscreen}
          >
            <span className="text-sm text-gray-700">+{images.length - 7} more</span>
          </button>
        )}
      </div>
      
      {/* Fullscreen Mode */}
      {fullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative max-w-6xl max-h-screen p-4">
            <img
              src={images[currentIndex]}
              alt={`Fullscreen ${currentIndex + 1}`}
              className="max-h-[85vh] mx-auto object-contain"
            />
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
            
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

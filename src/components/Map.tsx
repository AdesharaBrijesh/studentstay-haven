
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  coordinates: [number, number];
  zoom?: number;
  interactive?: boolean;
  markers?: Array<{
    coordinates: [number, number];
    title: string;
  }>;
}

const Map: React.FC<MapProps> = ({ 
  coordinates, 
  zoom = 14, 
  interactive = true,
  markers = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // This is a placeholder since we can't actually implement a real map in this demo
  // In a real implementation, we would use a library like Mapbox or Google Maps

  useEffect(() => {
    if (mapRef.current) {
      // In a real implementation, this is where we would initialize the map
      console.log('Map initialized with coordinates:', coordinates, 'at zoom level:', zoom);
      
      if (markers && markers.length > 0) {
        console.log('Adding markers:', markers);
      }
    }
  }, [coordinates, zoom, markers]);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-gray-100 rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full">
        {/* Placeholder for map */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 overflow-hidden">
          <div className="text-gray-400 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm">Map view would display here</p>
            <p className="text-xs mt-1">Coordinates: {coordinates[0]}, {coordinates[1]}</p>
          </div>
        </div>
        
        {/* Property location marker (for visual representation in this demo) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
          </div>
        </div>
      </div>
      
      {/* Interactive controls (placeholder) */}
      {interactive && (
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
            +
          </button>
          <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;

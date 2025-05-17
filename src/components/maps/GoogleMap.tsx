
import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface Hospital {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  phone: string;
  doctors: { name: string; specialty: string; contact: string }[];
}

interface MapProps {
  hospitals: Hospital[];
  onHospitalSelect: (hospital: Hospital) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  borderRadius: '0.5rem'
};

const center = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194
};

const GoogleMapComponent: React.FC<MapProps> = ({ hospitals, onHospitalSelect }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
  });

  const handleMarkerClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    onHospitalSelect(hospital);
  };

  if (loadError) return <div className="p-6 text-center bg-red-50 text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="p-6 text-center bg-gray-50">Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
          {
            featureType: 'poi.medical',
            stylers: [{ visibility: 'on' }],
          },
          {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }}
    >
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.id}
          position={hospital.location}
          onClick={() => handleMarkerClick(hospital)}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Hospital marker icon
          }}
        />
      ))}

      {selectedHospital && (
        <InfoWindow
          position={selectedHospital.location}
          onCloseClick={() => setSelectedHospital(null)}
        >
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-sm">{selectedHospital.name}</h3>
            <p className="text-xs text-gray-600">{selectedHospital.address}</p>
            <p className="text-xs text-medical-600 mt-1">{selectedHospital.phone}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;

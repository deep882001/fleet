import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './MapView.css';

const mapContainerStyle = {
  width: '100%',
  height: '450px',
};

const center = {
  lat: 39.5296, // Latitude for Reno, NV
  lng: -119.8138, // Longitude for Reno, NV
};

const MapView = () => {
  const markers = [
    { lat: 39.618162, lng: -119.204015, id: 'P5190392' },
    { lat: 39.496669, lng: -119.446177, id: 'P5190384' },
    { lat: 39.4955, lng: -119.445693, id: 'P5190371' },
  ];

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyDdfBAd4GUSQpO6xj9P2oivYS2ix6yerTw">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          {markers.map((marker) => (
            <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapView;
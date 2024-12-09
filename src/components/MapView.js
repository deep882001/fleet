import React, { useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapStyles.css';

const MapboxBuildings2D = () => {
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVlcDg4cGF0ZWwiLCJhIjoiY20zbTVmemJjMGRuaDJpcHprM2YwY2p0eCJ9.o-sd0D017E8rvE8-Hch6Mw';

  // GeoJSON for multiple 2D buildings
  const buildingGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-119.436511, 39.508633],
              [-119.436111, 39.508633],
              [-119.436111, 39.508533],
              [-119.436511, 39.508533],
              [-119.436511, 39.508633], // Close polygon
            ],
          ],
        },
        properties: {
          name: 'Building A',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-119.437211, 39.508833],
              [-119.436811, 39.508833],
              [-119.436811, 39.508733],
              [-119.437211, 39.508733],
              [-119.437211, 39.508833], // Close polygon
            ],
          ],
        },
        properties: {
          name: 'Building B',
        },
      },
    ],
  };

  const [viewState, setViewState] = useState({
    latitude: 39.508633,
    longitude: -119.436311,
    zoom: 17, // Zoom in to view buildings more closely
  });

  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <div className="map-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(e) => {
          const features = e.target.queryRenderedFeatures(e.point);
          if (features.length) {
            const feature = features[0];
            setSelectedBuilding(feature.properties);
          }
        }}
      >
        {/* Add buildings as polygons */}
        <Source id="2d-buildings" type="geojson" data={buildingGeoJSON}>
          <Layer
            id="building-layer-2d"
            type="fill-extrusion"
            paint={{
              'fill-extrusion-color': 'rgba(0, 0, 0, 0)', // No fill color (transparent)
              'fill-extrusion-outline-color': '#red', // Border color
              'fill-extrusion-opacity': 0.6, // Border opacity
              'fill-extrusion-width': 3, // Border width
            }}
          />
        </Source>

        {/* Popup for selected building */}
        {selectedBuilding && (
          <Popup
            latitude={selectedBuilding.latitude}
            longitude={selectedBuilding.longitude}
            onClose={() => setSelectedBuilding(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="popup-content">
              <h3>{selectedBuilding.name}</h3>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapboxBuildings2D;

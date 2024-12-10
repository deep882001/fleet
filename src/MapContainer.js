import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const MapContainer = ({ assets, selectedAsset }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-119.8138, 39.5296], // Centered around Reno, NV
      zoom: 10,
    });

    assets.forEach((asset) => {
      new mapboxgl.Marker()
        .setLngLat([asset.last_location_lng, asset.last_location_lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<strong>Asset ID:</strong> ${asset.asset_id}<br/>
            <strong>Last Updated:</strong> ${asset.last_updated}`
          )
        )
        .addTo(map);
    });

    return () => map.remove(); // Cleanup map instance on unmount
  }, [assets]);

  return <div id="map" className="map-container"></div>;
};

export default MapContainer;

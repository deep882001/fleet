import React, { useEffect, useState } from "react";
import fetchAssets from "./FetchAssets";
import "./AssetTable.css";

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAssets();
        // Ensure assets have locations before updating the state
        const validAssets = data
          .filter(asset => asset.lastLocation) // Check if lastLocation exists
          .map(asset => ({
            id: asset.id,
            name: asset.name || "Unnamed Asset",
            location: asset.lastLocation,
            status: asset.status || "Unknown",
          }));
        setAssets(validAssets);
      } catch (err) {
        console.error("Error fetching assets:", err);
        setError("Failed to fetch asset data.");
      }
    };
    loadAssets();
  }, []);

  return (
    <div className="asset-table">
      <h2>Assets</h2>
      {error && <p className="error">{error}</p>}
      {assets.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>
                  {asset.location?.lat}, {asset.location?.lng}
                </td>
                <td>{asset.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assets available to display.</p>
      )}
    </div>
  );
};

export default AssetTable;

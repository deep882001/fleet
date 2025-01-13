import React, { useState, useEffect } from 'react';
import fetchAssets from '../api/fetchAssets'; // Import fetchAssets function
import './AssetTable.css'; // Import the CSS file

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch assets data dynamically
    const loadAssets = async () => {
      try {
        const data = await fetchAssets(); // Call the fetchAssets function
        setAssets(data); // Update state with fetched data
      } catch (err) {
        setError('Failed to fetch asset data.');
        console.error(err);
      }
    };

    loadAssets();
  }, []);

  return (
    <div className="asset-table-container">
      <h1 className="asset-table-title">Asset Table</h1>
      {error && <p className="asset-table-error">{error}</p>}
      <table className="asset-table">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>
                {asset.location?.lat}, {asset.location?.lng}
              </td>
              <td>{asset.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;

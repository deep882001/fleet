import React from "react";
import "./../styles/AssetTable.css";

const AssetTable = ({ assets }) => {
  return (
    <div className="asset-table">
      <h2>Asset Table</h2>
      {assets.length === 0 ? (
        <p>No assets available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.location.lat || "N/A"}</td>
                <td>{asset.location.lng || "N/A"}</td>
                <td>{asset.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssetTable;

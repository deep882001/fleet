import React, { useState, useEffect } from 'react';
import './AssetTable.css';

const AssetTable = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const data = [
      { id: 'P5190392', location: 'Duffy Rd, Fernley, NV', status: 'Stopped' },
      { id: 'P5190384', location: '398 Coyote Valley Way, Sparks, NV', status: 'Stopped' },
      { id: 'P5190371', location: '398 Coyote Valley Way, Sparks, NV', status: 'Stopped' },
    ];
    setAssets(data);
  }, []);

  return (
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
            <td>{asset.location}</td>
            <td>{asset.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssetTable;

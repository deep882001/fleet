import React from "react";

const Sidebar = ({ assets, filter, setFilter, setSelectedAsset }) => {
  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search assets..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {assets.map((asset) => (
          <li
            key={asset.asset_id}
            onClick={() => setSelectedAsset(asset)}
            className="asset-item"
          >
            {asset.asset_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

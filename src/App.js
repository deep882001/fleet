import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapContainer from "./components/MapContainer";
import DataTable from "./components/DataTable";
import "./App.css";

function App() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchLocations = async () => {
    try {
      const response = await fetch("/get-locations"); // Backend API
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(fetchLocations, 3600000); // 1 hour
    return () => clearInterval(interval); // Cleanup
  }, []);

  const filteredAssets = assets.filter(
    (asset) =>
      asset.asset_id.toLowerCase().includes(filter.toLowerCase()) ||
      asset.last_updated.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar
          assets={filteredAssets}
          filter={filter}
          setFilter={setFilter}
          setSelectedAsset={setSelectedAsset}
        />
        <MapContainer
          assets={filteredAssets}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        />
      </div>
      <DataTable />
    </div>
  );
}

export default App;

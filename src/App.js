import React from 'react';
import AssetTable from './Components/AssetTable';
import Navbar from './Components/navBar';
import MapView from './Components/mapView';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <main>
        <MapView />
        <AssetTable />
      </main>
    </div>
  );
};

export default App;
import React from 'react';
import './navBar.css';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from "react-router-dom";

const navBar = () => {
  const navigate = useNavigate(); // Hook should be inside the component

  return (
    <div className="header">
      {/* Navigate programmatically on click */}
      <button className="header__logo" onClick={() => navigate("/")}>
        Fleet Locate
      </button>

      <div className="header__map">
        <button className="header__mapLink" onClick={() => navigate("/")}>
          Map
          <MapIcon className="header__searchIcon" />
        </button>
      </div>
    </div>
  );
};

export default navBar;

// src/components/Banner.js
import React from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = ({ image, title, subtitle }) => {
  return (
    <div className="banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="banner-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;

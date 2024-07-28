// src/components/LandingPage.js
import React from 'react';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h1>Welcome to Beautiful Landing Page</h1>
            <p>Explore the amazing features we offer.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
          {/* Add more sections, features, or components */}
        </div>
      </div>
      {/* Add more sections or components for your landing page */}
    </div>
  );
};

export default LandingPage;

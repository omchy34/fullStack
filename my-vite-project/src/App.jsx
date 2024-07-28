import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Adjusted import

import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SingUpPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import Certificates from './components/Certificates.jsx';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/Certificates' element={<Certificates/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

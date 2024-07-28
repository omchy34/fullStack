import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import AdminLayout from "./layouts/AdminLayouts";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CertificatesReq from "./pages/CertificatesReq";
import AdminLogin from "./components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="CertificatesReq" element={<CertificatesReq />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

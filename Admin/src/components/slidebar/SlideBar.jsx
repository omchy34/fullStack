import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <>
      {token ? (
        <div className="w-60 bg-gray-800 text-white h-screen">
          <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
            Admin Panel
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/CertificatesReq" className="block p-2 hover:bg-gray-700 rounded">
                  Certificates Request
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="block p-2 hover:bg-gray-700 rounded">
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        "You are not able to access this page"
      )}
    </>
  );
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'mdb-ui-kit/css/mdb.min.css'; // Import MDB CSS
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [UserData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      async function getData() {
        const response = await axios.post('/api/v1/user/userData', {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { email } = response.data.data.user;
        setUserData(email);
      }

      getData();
    }
  }, [accessToken]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    alert("Logout successful");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#home">
          Beautiful Landing
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            {accessToken ? (
              <li className="nav-item">
                <Link className="nav-link" to="/Certificates">
                  Certificates
                </Link>
              </li>
            ) : ("")}
            {/* Add more nav items as needed */}
          </ul>
          <ul className="navbar-nav">
            {accessToken ? (
              <div className='d-flex gap-3'>
                <li className="nav-item">
                  <button type="button" className="btn btn-danger" onClick={handleLogout} data-mdb-ripple-init>
                    Logout
                  </button>
                </li>
                <li className="nav-item text-light">
                  {UserData}
                </li>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

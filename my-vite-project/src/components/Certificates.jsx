import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Certificates = () => {
  const [eligible, setEligible] = useState(false);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    // Check if user is eligible and get the certificate URL if available
    async function checkEligibility() {
      try {
        const Token = localStorage.getItem("accessToken");
        const response = await axios.get("/api/v1/certificates/eligible", {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(response);
        setEligible(response.data.eligible);
        setCertificate(response.data.certificate);
      } catch (error) {
        console.log("Error fetching eligibility:", error);
      }
    }

    checkEligibility();
  }, []);

  const handleRequestCertificate = async () => {
    try {
      const Token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "/api/v1/certificates/request",
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if(response){
        alert(response.data.status)
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        console.error("Error submitting certificate request:", error);
        alert("Error submitting certificate request.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Certificates</h2>
      {eligible ? (
        certificate ? (
          <a href={certificate} download="certificate.pdf">
            Download Certificate
          </a>
        ) : (
          <p>Your certificate is being processed.</p>
        )
      ) : (
        <div>
          <p>You are not eligible to claim a certificate.</p>
          <button onClick={handleRequestCertificate}>
            Request Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificates;

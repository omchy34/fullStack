import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificatesReq = () => {
  const [requests, setRequests] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [error, setError] = useState(null);

  // Retrieve the access token from localStorage or any other storage
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch all certificate requests
    axios.get("/api/v1/certificates/requests", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      setRequests(response.data.requests);
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to fetch certificate requests");
    });
  }, [accessToken]);

  const handleApprove = (id) => {
    axios.patch(`/api/v1/certificates/approve/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "approved" } : req
        )
      );
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to approve certificate request");
    });
  };

  const handleDeny = (id) => {
    axios.patch(`/api/v1/certificates/deny/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "denied" } : req
        )
      );
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to deny certificate request");
    });
  };

  const handleDelete = (requestId) => {
    axios.delete(`/api/v1/certificates/DeleteRequest/${requestId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to delete certificate request");
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (id) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("certificate", file);

    axios.post(`/api/v1/certificates/upload/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "uploaded" } : req
        )
      );
      setFile(null); // Clear the file input
      setSelectedRequestId(null); // Clear the selected request
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to upload certificate");
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {requests.map((request) => (
          <li key={request._id} className="border p-4 rounded-md shadow-md">
            <p>
              <strong>User ID:</strong> {request.userId.email}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
            <div className="space-x-2 mt-2">
              <button
                className="p-2 bg-green-400 rounded"
                onClick={() => handleApprove(request._id)}
              >
                Approve
              </button>
              <button
                className="p-2 bg-red-400 rounded"
                onClick={() => handleDeny(request._id)}
              >
                Deny
              </button>
              <button
                className="p-2 bg-red-400 rounded"
                onClick={() => handleDelete(request._id)}
              >
                Delete
              </button>
            </div>
            {request.status === "approved" && (
              <div className="mt-2">
                <input type="file" onChange={handleFileChange} />
                <button
                  className="p-2 bg-blue-400 rounded mt-2"
                  onClick={() => handleUpload(request._id)}
                >
                  Upload Certificate
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificatesReq;

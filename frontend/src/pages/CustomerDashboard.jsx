import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [dashboard, setDashboard] = useState({
    customer_name: "",
    total_vehicles: 0,
    pending_services: 0,
    completed_services: 0,
    service_history: 0,
    recent_requests: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customer-dashboard/${user.id}/`
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  return (
    <div>
      {/* Navbar */}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "#0d6efd",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 1000,
        }}
      >
        <h3>Customer Dashboard</h3>

        <button
          onClick={logout}
          style={{
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>

      {/* Sidebar */}

      <div
        style={{
          position: "fixed",
          top: "60px",
          left: 0,
          width: "220px",
          bottom: 0,
          background: "#212529",
          color: "#fff",
          paddingTop: "20px",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          <li style={{ padding: "15px" }}>
            <Link
              to="/customer-dashboard"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/my-vehicles"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              My Vehicles
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/book-service"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Book Service
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/my-requests"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              My Requests
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/profile"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}

      <div
        style={{
          marginLeft: "220px",
          marginTop: "60px",
          padding: "20px",
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        <h2>
          Welcome, {dashboard.customer_name}
        </h2>

        {/* Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Vehicles</h3>
            <h1>{dashboard.total_vehicles}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Pending Services</h3>
            <h1>{dashboard.pending_services}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Completed Services</h3>
            <h1>{dashboard.completed_services}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Service History</h3>
            <h1>{dashboard.service_history}</h1>
          </div>
        </div>

        {/* Recent Requests */}

        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            overflowX: "auto",
          }}
        >
          <h3>Recent Service Requests</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>
                  Vehicle Number
                </th>
                <th style={thStyle}>
                  Service Type
                </th>
                <th style={thStyle}>
                  Request Date
                </th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recent_requests.map(
                (request) => (
                  <tr key={request.id}>
                    <td style={tdStyle}>
                      {request.id}
                    </td>

                    <td style={tdStyle}>
                      {request.vehicle_number}
                    </td>

                    <td style={tdStyle}>
                      {request.service_type}
                    </td>

                    <td style={tdStyle}>
                      {request.request_date}
                    </td>

                    <td style={tdStyle}>
                      {request.status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#0d6efd",
  color: "#fff",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default CustomerDashboard;
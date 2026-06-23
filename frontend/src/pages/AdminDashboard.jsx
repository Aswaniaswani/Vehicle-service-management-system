import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total_customers: 0,
    total_vehicles: 0,
    pending_services: 0,
    in_progress_services: 0,
    completed_services: 0,
    total_revenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin-dashboard/"
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  return (
    <div>
      {/* Navbar */}

      <div
        style={{
          height: "60px",
          background: "#0d6efd",
          color: "#fff",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 1000,
        }}
      >
        <h3>Vehicle Service Admin</h3>

        <button
          onClick={handleLogout}
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
          width: "220px",
          background: "#212529",
          color: "#fff",
          position: "fixed",
          top: "60px",
          left: 0,
          bottom: 0,
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
              to="/admin-dashboard"
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
              to="/customers"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Customers
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/vehicles"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Vehicles
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/service-requests"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Service Requests
            </Link>
          </li>

          <li style={{ padding: "15px" }}>
            <Link
              to="/service-history"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Service History
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
        <h2>Admin Dashboard</h2>

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
            <h3>Total Customers</h3>
            <h1>{dashboard.total_customers}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Vehicles</h3>
            <h1>{dashboard.total_vehicles}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Pending Services</h3>
            <h1>{dashboard.pending_services}</h1>
          </div>

          <div style={cardStyle}>
            <h3>In Progress</h3>
            <h1>{dashboard.in_progress_services}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Completed Services</h3>
            <h1>{dashboard.completed_services}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Revenue</h3>
            <h1>₹{dashboard.total_revenue}</h1>
          </div>
        </div>

        {/* Summary Section */}

        <div
          style={{
            background: "#fff",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Service Summary</h3>

          <p>
            Total Customers Registered:{" "}
            {dashboard.total_customers}
          </p>

          <p>
            Total Vehicles Registered:{" "}
            {dashboard.total_vehicles}
          </p>

          <p>
            Pending Requests:{" "}
            {dashboard.pending_services}
          </p>

          <p>
            Services In Progress:{" "}
            {dashboard.in_progress_services}
          </p>

          <p>
            Completed Services:{" "}
            {dashboard.completed_services}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
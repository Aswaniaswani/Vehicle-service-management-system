import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#212529",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: "60px",
        bottom: 0,
      }}
    >
      {/* <h3
        style={{
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        Admin Panel
      </h3> */}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li style={menuItem}>
          <Link style={linkStyle} to="/admin-dashboard">
            Dashboard
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/customers">
            Customers
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/vehicles">
            Vehicles
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/service-requests">
            Service Requests
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/service-history">
            Service History
          </Link>
        </li>
      </ul>
    </div>
  );
}

const menuItem = {
  padding: "15px 20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default AdminSidebar;
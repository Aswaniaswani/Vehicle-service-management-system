import React from "react";
import { Link } from "react-router-dom";

function CustomerSidebar() {
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
        Customer
      </h3> */}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li style={menuItem}>
          <Link style={linkStyle} to="/customer-dashboard">
            Dashboard
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/my-vehicles">
            My Vehicles
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/book-service">
            Book Service
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/my-requests">
            My Requests
          </Link>
        </li>

        <li style={menuItem}>
          <Link style={linkStyle} to="/profile">
            Profile
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

export default CustomerSidebar;
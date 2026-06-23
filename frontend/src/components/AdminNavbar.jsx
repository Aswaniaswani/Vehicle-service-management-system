import React from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        background: "#0d6efd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        color: "#fff",
        zIndex: 999,
      }}
    >
      <h3>Vehicle Service System</h3>

      <button
        onClick={logout}
        style={{
          background: "#0d6efd",
          color: "#fff",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
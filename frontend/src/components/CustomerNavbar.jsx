import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
      <h3>Customer Portal</h3>

      <div>
        Welcome {user?.name}
      </div>

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

export default CustomerNavbar;
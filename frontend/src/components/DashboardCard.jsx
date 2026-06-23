import React from "react";

function DashboardCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h4>{title}</h4>

      <h1>{value}</h1>
    </div>
  );
}

export default DashboardCard;
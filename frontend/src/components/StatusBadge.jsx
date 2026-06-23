import React from "react";

function StatusBadge({ status }) {
  const getColor = () => {
    if (status === "Pending")
      return "#ffc107";

    if (status === "In Progress")
      return "#0d6efd";

    if (status === "Completed")
      return "#198754";

    return "#6c757d";
  };

  return (
    <span
      style={{
        background: getColor(),
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "20px",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
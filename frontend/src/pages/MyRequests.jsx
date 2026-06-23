import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import CustomerSidebar from "../components/CustomerSidebar";

function MyRequests() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/my-requests/${user.id}/`
      );

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this request?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/service-requests/${id}/`
      );

      alert("Request Cancelled");
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRequests = requests.filter(
    (request) => {
      const searchMatch =
        request.service_type
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        request.vehicle_number
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All"
          ? true
          : request.status === statusFilter;

      return searchMatch && statusMatch;
    }
  );

  const getStatusColor = (status) => {
    if (status === "Pending") return "#ffc107";
    if (status === "In Progress")
      return "#0d6efd";
    if (status === "Completed")
      return "#198754";

    return "#6c757d";
  };

  return (
     <>
  <CustomerNavbar />
  <CustomerSidebar />
    <div
      style={{
        marginLeft: "220px",
        marginTop: "60px",
        padding: "20px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h2>My Service Requests</h2>

      {/* Search & Filter */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Request..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            width: "300px",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={{
            padding: "10px",
            width: "200px",
          }}
        >
          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      {/* Request Table */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
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
                Preferred Date
              </th>
              <th style={thStyle}>
                Description
              </th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map(
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
                      {request.preferred_date}
                    </td>

                    <td style={tdStyle}>
                      {request.description}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            getStatusColor(
                              request.status
                            ),
                          color: "#fff",
                          padding:
                            "5px 10px",
                          borderRadius:
                            "20px",
                        }}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      {request.status ===
                        "Pending" && (
                        <button
                          onClick={() =>
                            cancelRequest(
                              request.id
                            )
                          }
                          style={{
                            background:
                              "red",
                            color:
                              "#fff",
                            border:
                              "none",
                            padding:
                              "6px 12px",
                            cursor:
                              "pointer",
                            borderRadius:
                              "5px",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
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

export default MyRequests;
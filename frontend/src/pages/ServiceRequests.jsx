import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    vehicle: "",
    service_type: "",
    description: "",
    request_date: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchRequests();
    fetchVehicles();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/requests/"
      );
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicles/"
      );
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      vehicle: "",
      service_type: "",
      description: "",
      request_date: "",
      status: "Pending",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/requests/${editingId}/`,
          formData
        );

        alert("Request Updated Successfully");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/requests/",
          formData
        );

        alert("Request Added Successfully");
      }

      resetForm();
      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (request) => {
    setEditingId(request.id);

    setFormData({
      vehicle: request.vehicle,
      service_type: request.service_type,
      description: request.description,
      request_date: request.request_date,
      status: request.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/requests/${id}/`
      );

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (value === "") {
      fetchRequests();
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/search/requests/?search=${value}`
      );

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
  <AdminNavbar />
  <AdminSidebar />
    <div
      style={{
        marginLeft: "220px",
        marginTop: "60px",
        padding: "20px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h2>Service Request Management</h2>

      <input
        type="text"
        placeholder="Search Request..."
        value={search}
        onChange={(e) =>
          handleSearch(e.target.value)
        }
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>
          {editingId
            ? "Edit Service Request"
            : "Add Service Request"}
        </h3>

        <form onSubmit={handleSubmit}>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Vehicle
            </option>

            {vehicles.map((vehicle) => (
              <option
                key={vehicle.id}
                value={vehicle.id}
              >
                {vehicle.vehicle_number}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="service_type"
            placeholder="Service Type"
            value={formData.service_type}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="date"
            name="request_date"
            value={formData.request_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
          >
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

          <button
            type="submit"
            style={saveBtn}
          >
            {editingId
              ? "Update Request"
              : "Add Request"}
          </button>
        </form>
      </div>

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
              <th style={thStyle}>Vehicle</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
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

                <td style={tdStyle}>
                  {request.description}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      handleEdit(request)
                    }
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(request.id)
                    }
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

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

const saveBtn = {
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
};

const editBtn = {
  background: "orange",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

export default ServiceRequests;
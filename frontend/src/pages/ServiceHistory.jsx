import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

function ServiceHistory() {
  const [history, setHistory] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    vehicle: "",
    service_type: "",
    cost: "",
    service_date: "",
    remarks: "",
  });

  useEffect(() => {
    fetchHistory();
    fetchVehicles();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/history/"
      );
      setHistory(response.data);
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
      cost: "",
      service_date: "",
      remarks: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/history/${editingId}/`,
          formData
        );

        alert("History Updated Successfully");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/history/",
          formData
        );

        alert("History Added Successfully");
      }

      resetForm();
      fetchHistory();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      vehicle: item.vehicle,
      service_type: item.service_type,
      cost: item.cost,
      service_date: item.service_date,
      remarks: item.remarks,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this history record?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/history/${id}/`
      );

      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = history.filter(
      (item) =>
        item.service_type
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        item.vehicle_number
          ?.toLowerCase()
          .includes(value.toLowerCase())
    );

    if (value === "") {
      fetchHistory();
    } else {
      setHistory(filtered);
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
      <h2>Service History Management</h2>

      <input
        type="text"
        placeholder="Search History..."
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
            ? "Edit Service History"
            : "Add Service History"}
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

          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={formData.cost}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="date"
            name="service_date"
            value={formData.service_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={saveBtn}
          >
            {editingId
              ? "Update History"
              : "Add History"}
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
              <th style={thStyle}>Cost</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Remarks</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>

                <td style={tdStyle}>
                  {item.vehicle_number}
                </td>

                <td style={tdStyle}>
                  {item.service_type}
                </td>

                <td style={tdStyle}>
                  ₹{item.cost}
                </td>

                <td style={tdStyle}>
                  {item.service_date}
                </td>

                <td style={tdStyle}>
                  {item.remarks}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
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
  borderRadius: "5px",
  cursor: "pointer",
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

export default ServiceHistory;
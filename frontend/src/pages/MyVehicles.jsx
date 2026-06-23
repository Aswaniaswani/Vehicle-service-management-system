import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import CustomerSidebar from "../components/CustomerSidebar";

function MyVehicles() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    vehicle_number: "",
    vehicle_name: "",
    model: "",
    fuel_type: "Petrol",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customer-vehicles/${user.id}/`
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
      vehicle_number: "",
      vehicle_name: "",
      model: "",
      fuel_type: "Petrol",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      customer: user.id,
    };

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/customer-vehicles/${editingId}/`,
          payload
        );

        alert("Vehicle Updated Successfully");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/customer-vehicles/",
          payload
        );

        alert("Vehicle Added Successfully");
      }

      resetForm();
      fetchVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      vehicle_number: vehicle.vehicle_number,
      vehicle_name: vehicle.vehicle_name,
      model: vehicle.model,
      fuel_type: vehicle.fuel_type,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/customer-vehicles/${id}/`
      );

      fetchVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicle_number
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.vehicle_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

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
      <h2>My Vehicles</h2>

      <input
        type="text"
        placeholder="Search Vehicle..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {/* Vehicle Form */}

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
            ? "Edit Vehicle"
            : "Add Vehicle"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="vehicle_number"
            placeholder="Vehicle Number"
            value={formData.vehicle_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="vehicle_name"
            placeholder="Vehicle Name"
            value={formData.vehicle_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Petrol">
              Petrol
            </option>
            <option value="Diesel">
              Diesel
            </option>
            <option value="Electric">
              Electric
            </option>
            <option value="CNG">
              CNG
            </option>
          </select>

          <button
            type="submit"
            style={saveBtn}
          >
            {editingId
              ? "Update Vehicle"
              : "Add Vehicle"}
          </button>
        </form>
      </div>

      {/* Vehicle Table */}

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
              <th style={thStyle}>Vehicle No</th>
              <th style={thStyle}>Vehicle Name</th>
              <th style={thStyle}>Model</th>
              <th style={thStyle}>Fuel Type</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td style={tdStyle}>{vehicle.id}</td>
                <td style={tdStyle}>
                  {vehicle.vehicle_number}
                </td>
                <td style={tdStyle}>
                  {vehicle.vehicle_name}
                </td>
                <td style={tdStyle}>
                  {vehicle.model}
                </td>
                <td style={tdStyle}>
                  {vehicle.fuel_type}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      handleEdit(vehicle)
                    }
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(vehicle.id)
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

export default MyVehicles;
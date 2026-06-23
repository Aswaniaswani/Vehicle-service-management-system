import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import CustomerSidebar from "../components/CustomerSidebar";

function BookService() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [vehicles, setVehicles] = useState([]);
  const [requests, setRequests] = useState([]);

  const [formData, setFormData] = useState({
    vehicle: "",
    service_type: "",
    description: "",
    preferred_date: "",
  });

  useEffect(() => {
    fetchVehicles();
    fetchRequests();
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      vehicle: "",
      service_type: "",
      description: "",
      preferred_date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        customer: user.id,
        vehicle: formData.vehicle,
        service_type: formData.service_type,
        description: formData.description,
        preferred_date: formData.preferred_date,
        status: "Pending",
      };

      await axios.post(
        "http://127.0.0.1:8000/api/service-requests/",
        payload
      );

      alert("Service Request Submitted Successfully");

      resetForm();
      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to Submit Request");
    }
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
      <h2>Book Vehicle Service</h2>

      {/* Booking Form */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>Service Booking Form</h3>

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
                {vehicle.vehicle_number} -
                {vehicle.vehicle_name}
              </option>
            ))}
          </select>

          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Service
            </option>

            <option value="General Service">
              General Service
            </option>

            <option value="Oil Change">
              Oil Change
            </option>

            <option value="Engine Repair">
              Engine Repair
            </option>

            <option value="Brake Service">
              Brake Service
            </option>

            <option value="Battery Replacement">
              Battery Replacement
            </option>

            <option value="Wheel Alignment">
              Wheel Alignment
            </option>

            <option value="AC Service">
              AC Service
            </option>
          </select>

          <textarea
            name="description"
            placeholder="Describe the issue"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={inputStyle}
          />

          <input
            type="date"
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={submitBtn}
          >
            Book Service
          </button>
        </form>
      </div>

      {/* My Recent Requests */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <h3>My Recent Requests</h3>

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
                  {request.preferred_date}
                </td>

                <td style={tdStyle}>
                  {request.status}
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

const submitBtn = {
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
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

export default BookService;
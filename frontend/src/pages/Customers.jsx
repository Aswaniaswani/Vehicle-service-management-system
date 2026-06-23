import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";


function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/customers/"
      );

      setCustomers(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/customers/${editingId}/`,
          formData
        );

        alert("Customer Updated Successfully");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/customers/",
          formData
        );

        alert("Customer Added Successfully");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });

      setEditingId(null);

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);

    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      password: customer.password,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/customers/${id}/`
      );

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    try {
      if (value === "") {
        fetchCustomers();
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/search/customers/?search=${value}`
      );

      setCustomers(response.data);
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
      <h2>Customer Management</h2>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Customer..."
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

      {/* Form */}

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
            ? "Edit Customer"
            : "Add Customer"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              background: "#0d6efd",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {editingId
              ? "Update Customer"
              : "Add Customer"}
          </button>
        </form>
      </div>

      {/* Table */}

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
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={tdStyle}>
                  {customer.id}
                </td>

                <td style={tdStyle}>
                  {customer.name}
                </td>

                <td style={tdStyle}>
                  {customer.email}
                </td>

                <td style={tdStyle}>
                  {customer.phone}
                </td>

                <td style={tdStyle}>
                  {customer.address}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      handleEdit(customer)
                    }
                    style={{
                      background: "orange",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(customer.id)
                    }
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
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

export default Customers;
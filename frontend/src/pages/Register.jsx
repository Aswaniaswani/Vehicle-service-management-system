import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        payload
      );

      setSuccess(
        response.data.message ||
          "Registration Successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Customer Registration
        </h2>

        {error && (
          <div
            style={{
              background: "#ffe6e6",
              color: "red",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#e6ffed",
              color: "green",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "478px",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "478px",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: "478px",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              style={{
                width: "478px",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "478px",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "478px",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
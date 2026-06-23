import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );

      const user = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "role",
        user.role
      );

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Login Failed"
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
      }}
    >
      <div
        style={{
          width: "400px",
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
          Vehicle Service Management
        </h2>

        {error && (
          <div
            style={{
              background: "#ffe6e6",
              color: "red",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "375px",
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
              required
              style={{
                width: "375px",
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
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        {/* <div
          style={{
            marginTop: "20px",
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>Admin Login</strong>

          <p>Email: admin@gmail.com</p>
          <p>Password: admin123</p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
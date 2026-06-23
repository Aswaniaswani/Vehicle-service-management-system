import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../components/CustomerNavbar";
import CustomerSidebar from "../components/CustomerSidebar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customer-profile/${user.id}/`
      );

      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/customer-profile/${user.id}/`,
        profile
      );

      alert("Profile Updated Successfully");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: profile.name,
          email: profile.email,
        })
      );
    } catch (error) {
      console.log(error);
      alert("Failed to Update Profile");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (
      passwordData.password !==
      passwordData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/change-password/${user.id}/`,
        {
          password: passwordData.password,
        }
      );

      alert("Password Changed Successfully");

      setPasswordData({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to Change Password");
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
      <h2>My Profile</h2>

      {/* Profile Card */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Profile Information</h3>

        <form onSubmit={updateProfile}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleProfileChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleProfileChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={profile.phone}
            onChange={handleProfileChange}
            required
            style={inputStyle}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={profile.address}
            onChange={handleProfileChange}
            rows="4"
            style={inputStyle}
          />

          <button
            type="submit"
            style={saveBtn}
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Change Password</h3>

        <form onSubmit={changePassword}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={passwordData.password}
            onChange={handlePasswordChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={saveBtn}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const saveBtn = {
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Profile;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

/* Auth Pages */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Admin Pages */
import AdminDashboard from "./pages/AdminDashboard";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import ServiceRequests from "./pages/ServiceRequests";
import ServiceHistory from "./pages/ServiceHistory";

/* Customer Pages */
import CustomerDashboard from "./pages/CustomerDashboard";
import MyVehicles from "./pages/MyVehicles";
import BookService from "./pages/BookService";
import MyRequests from "./pages/MyRequests";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route path="/login" element={<Login />} />


        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service-requests"
          element={
            <ProtectedRoute>
              <ServiceRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service-history"
          element={
            <ProtectedRoute>
              <ServiceHistory />
            </ProtectedRoute>
          }
        />

        {/* Customer Routes */}

        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-vehicles"
          element={
            <ProtectedRoute>
              <MyVehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-service"
          element={
            <ProtectedRoute>
              <BookService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
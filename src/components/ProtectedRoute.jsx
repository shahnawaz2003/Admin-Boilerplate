// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with actual auth logic
  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;

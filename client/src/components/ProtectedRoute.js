import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const checkLocalStorage = localStorage.getItem("isAuthenticated");
  const location = useLocation();
  
  if (checkLocalStorage === "true") {
    return children;
  }
  
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;

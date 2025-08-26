import React, { useEffect } from 'react';

const LogOut = () => {
  useEffect(() => {
    console.log("=== LOGOUT PROCESS STARTED ===");
    console.log("Before logout - localStorage items:", {
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user")
    });
    
    // Clear localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    console.log("After logout - localStorage items:", {
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user")
    });
    
    console.log("Redirecting to login...");
    // Redirect to login
    setTimeout(() => {
      window.location.replace("/login");
    }, 1000); // Add small delay to see the logging
  }, []);

  // Show a loading message while logout is processing
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      Logging out...
    </div>
  );
};

export default LogOut;

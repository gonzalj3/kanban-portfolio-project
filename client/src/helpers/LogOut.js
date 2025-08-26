import React, { useEffect } from 'react';

const LogOut = () => {
  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Redirect to login
    window.location.replace("/login");
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

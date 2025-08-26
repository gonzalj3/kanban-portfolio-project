import React, { useEffect } from 'react';
import { useAuth } from '../context/auth/auth.provider';
import { setIsAuthenticated } from '../context/auth/auth.action';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const { dispatchIsAuthenticated, dispatchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Clear AuthProvider context state
    dispatchIsAuthenticated(setIsAuthenticated(false));
    dispatchUser({ type: 'CLEAR_USER' });
    
    // Navigate to login page
    navigate('/login', { replace: true });
  }, [dispatchIsAuthenticated, dispatchUser, navigate]);

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

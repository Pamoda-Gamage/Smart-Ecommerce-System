import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock function to check if user is authenticated and an admin
const isAdmin = () => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  if (!token) {
    return false; // No token means user is not authenticated
  }

  try {
    const user = JSON.parse(atob(token.split('.')[1])); // Decode the token's payload
    return user.role === 'admin'; // Check if the user is an admin
  } catch (error) {
    return false;
  }
};

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/productconsole/login" />;  // Redirects to login if not admin
};

export default AdminRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user ? user.role : null;

  if (!userRole || !allowedRoles.includes(userRole)) {
    // If the user is not logged in or doesn't have the required role,
    // redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  // If the user has the correct role, render the component.
  return children;
};

export default PrivateRoute;
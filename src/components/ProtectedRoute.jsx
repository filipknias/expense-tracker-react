import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo, isAuth }) => {
  if (!isAuth) return <Navigate to="/login" replace />;
  return isAuth ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
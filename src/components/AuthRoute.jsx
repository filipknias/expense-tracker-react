import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children, isAuth }) => {
  return isAuth ? <Navigate to="/" /> : children;
}

export default AuthRoute;
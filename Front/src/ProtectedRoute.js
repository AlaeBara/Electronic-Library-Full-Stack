import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
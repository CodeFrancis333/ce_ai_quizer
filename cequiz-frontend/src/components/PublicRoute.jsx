import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If token exists, user is authenticated and should not access public routes
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children (login or signup pages)
  return children;
};

export default PublicRoute;

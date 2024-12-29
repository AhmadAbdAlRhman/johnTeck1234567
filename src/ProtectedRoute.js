import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import  {AuthContext}  from "./Authentication/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/Main-DashBoard-RAYS" />;
};

export default ProtectedRoute;

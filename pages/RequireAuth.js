import React from "react";

import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
const RequireAuth = ({ children, redirectTo }) => {
  const { isAuthenticated, user } = useUserContext();
  const isUser = isAuthenticated && user;
  return isUser ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;

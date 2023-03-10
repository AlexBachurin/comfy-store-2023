import { User_Context_Type } from "@src/context/user/user_context_types";
import React from "react";

import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user/user_context";

type RequireAuth_Props = {
  children: JSX.Element;
  redirectTo: string;
};
const RequireAuth: React.FC<RequireAuth_Props> = ({ children, redirectTo }) => {
  const { isAuthenticated, user } = useUserContext() as User_Context_Type;
  // const isUser = isAuthenticated && user;
  return user ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;

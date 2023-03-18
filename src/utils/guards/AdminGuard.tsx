import React, { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../constants";
import { useIsUserActive } from "../hooks/useIsUserActive";
import { getLoggedUser, logout } from "../http-utils/user-requests";
import { User } from "../types/user";

const AdminGuard: FC<PropsWithChildren> = ({ children }) => {
  const user = getLoggedUser() as User;
  const isActive = useIsUserActive(user?.id);

  if (!user) {
    return <Navigate to={PATHS.Login} />;
  } else if (!isActive) {
    logout();
    return <Navigate to={PATHS.Login} />;
  } else if (user && user.role !== "admin") {
    return <Navigate to={PATHS.Home} />;
  }

  return <>{children}</>;
};

export default AdminGuard;

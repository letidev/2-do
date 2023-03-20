import React, { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../constants";
import { getLoggedUser } from "../http-utils/user-requests";
import { User } from "../types/user";

const UserGuard: FC<PropsWithChildren> = ({ children }) => {
  const user = getLoggedUser() as User;

  if (!user) {
    return <Navigate to={PATHS.Login} />;
  }

  return <>{children}</>;
};

export default UserGuard;

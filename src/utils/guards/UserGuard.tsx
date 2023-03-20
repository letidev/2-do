import React, { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../constants";
import { getLoggedUserId } from "../http-utils/user-requests";

const UserGuard: FC<PropsWithChildren> = ({ children }) => {
  const userId = getLoggedUserId();

  if (!userId) {
    return <Navigate to={PATHS.Login} />;
  }

  return <>{children}</>;
};

export default UserGuard;

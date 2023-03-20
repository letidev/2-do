import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../constants";
import { getLoggedUserId } from "../http-utils/user-requests";

const NonAuthenticatedGuard: FC<PropsWithChildren> = ({ children }) => {
  const user = getLoggedUserId();

  if (user) {
    return <Navigate to={PATHS.Home} />;
  }

  return <>{children}</>;
};

export default NonAuthenticatedGuard;

import { useState, useEffect } from "react";
import { getUserById } from "../http-utils/user-requests";

export const useIsUserActive = (id: string) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsActive(false);
    } else {
      getUserById(id).then((user) => setIsActive(user.data.isActive));
    }
  }, [id]);

  return isActive;
};

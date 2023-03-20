import { FC, useMemo } from "react";
import CheckMark from "../../../assets/check-mark.png";
import Delete from "../../../assets/delete.png";
import Edit from "../../../assets/edit.png";
import CheckMarkFilled from "../../../assets/check-mark-filled.png";
import Logout from "../../../assets/logout.png";
import User from "../../../assets/user.png";

interface Props {
  onClick: () => void;
  icon: "edit" | "delete" | "complete" | "uncomplete" | "logout" | "user";
  // used for displaying OS-specific tooltip
  title: string;
}

const IconButton: FC<Props> = ({ onClick, icon, title }) => {
  let iconSrc = useMemo(() => {
    if (icon === "complete") {
      return CheckMark;
    } else if (icon === "delete") {
      return Delete;
    } else if (icon === "uncomplete") {
      return CheckMarkFilled;
    } else if (icon === "logout") {
      return Logout;
    } else if (icon === "user") {
      return User;
    }
    return Edit;
  }, [icon]);

  return (
    <button onClick={onClick} className="w-[20px] h-[20px]" title={title}>
      <img src={iconSrc} alt={`${icon} icon`} />
    </button>
  );
};

export default IconButton;

import { FC, useMemo } from "react";
import CheckMark from "../../../assets/check-mark.png";
import Delete from "../../../assets/delete.png";
import Edit from "../../../assets/edit.png";

interface Props {
  onClick: () => void;
  icon: "edit" | "delete" | "complete";
}

const IconButton: FC<Props> = ({ onClick, icon }) => {
  let iconSrc = useMemo(() => {
    if (icon === "complete") {
      return CheckMark;
    } else if (icon === "delete") {
      return Delete;
    }
    return Edit;
  }, [icon]);

  return (
    <button onClick={onClick} className="w-[20px] h-[20px]">
      <img src={iconSrc} alt={`${icon} icon`} />
    </button>
  );
};

export default IconButton;
import moment from "moment";
import { FC, useMemo } from "react";
import { ToDo } from "../../utils/types/todo";
import IconButton from "./inputs/IconButton";

interface Props {
  todo: ToDo;
}

const ToDoDisplay: FC<Props> = ({ todo: { title, status, dueDate } }) => {
  const isOverDueDate = useMemo(
    () => moment(dueDate).isSameOrBefore(moment().subtract(1, "day")),
    [dueDate]
  );

  let shadowStyle = "shadow-indigo-300";

  if (isOverDueDate && status === "ongoing") {
    shadowStyle = "shadow-red-200";
  }

  if (status === "done") {
    shadowStyle = "shadow-neutral-300";
  }

  return (
    <div
      className={`w-full px-5 py-4 shadow-md bg-slate-300 rounded-2xl ${shadowStyle}`}
    >
      <div className="flex flex-col items-start sm:flex-row sm:items-center">
        <div className="flex-grow font-medium">{title}</div>

        <div className="flex flex-row items-start mt-5 gap-x-5 sm:mt-0 sm:ml-6">
          <div className={`${isOverDueDate && "text-red-600"}`}>
            {moment(dueDate).format("DD.MM.yyyy")}
          </div>
          <IconButton onClick={() => {}} icon="edit" />
          <IconButton onClick={() => {}} icon="delete" />
          <IconButton onClick={() => {}} icon="complete" />
        </div>
      </div>
    </div>
  );
};

export default ToDoDisplay;

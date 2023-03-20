import moment from "moment";
import { FC, useMemo, useState } from "react";
import { deleteTodo, editTodo } from "../../utils/http-utils/todo-requests";
import { ToDo } from "../../utils/types/todo";
import ConfirmationModal from "./modals/ConfirmationModal";
import IconButton from "./inputs/IconButton";
import EditTodoModal from "./modals/EditTodoModal";

interface Props {
  todo: ToDo;
  refresh: () => void;
}

const ToDoDisplay: FC<Props> = ({ todo, refresh }) => {
  const isOverDueDate = useMemo(
    () =>
      moment(todo.dueDate).isSameOrBefore(moment().subtract(1, "day")) &&
      todo.status === "ongoing",
    [todo.dueDate, todo.status]
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  let shadowStyle = "shadow-indigo-300";

  if (isOverDueDate && todo.status === "ongoing") {
    shadowStyle = "shadow-red-200";
  }

  if (todo.status === "done") {
    shadowStyle = "shadow-slate-400";
  }

  const onDelete = () => {
    deleteTodo(todo.id).then(() => {
      refresh();
      setIsDeleteModalOpen(false);
    });
  };

  const onCompleteTodo = () => {
    editTodo({ ...todo, status: "done" }).then(() => {
      refresh();
    });
  };

  const onRevertTodo = () => {
    editTodo({ ...todo, status: "ongoing" }).then(() => {
      refresh();
    });
  };

  return (
    <div
      className={`w-full px-5 py-4 shadow-md bg-slate-300 rounded-2xl ${shadowStyle}`}
    >
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title={`Are you sure you wish to proceed?`}
        text={`This will permanently delete "${todo.title}", this action is irreversible.`}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
      />

      <EditTodoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refresh={refresh}
        todo={todo}
      />
      <div className="flex flex-col items-start sm:flex-row sm:items-center">
        <div
          className={`flex-grow font-medium  ${
            todo.status === "done"
              ? "line-through text-slate-500"
              : "text-slate-800"
          }`}
        >
          {todo.title}
        </div>

        <div
          className={`flex flex-row items-start mt-5 gap-x-5 sm:mt-0 sm:ml-6 ${
            todo.status === "done" && "opacity-50"
          }`}
        >
          <div
            className={`${isOverDueDate && "text-red-600"} ${
              todo.status === "done" && "text-slate-900"
            }`}
          >
            {moment(todo.dueDate).format("DD.MM.yyyy")}
          </div>

          {todo.status === "ongoing" && (
            <IconButton
              onClick={() => setIsEditModalOpen(true)}
              icon="edit"
              title="Edit item"
            />
          )}
          <IconButton
            onClick={() => setIsDeleteModalOpen(true)}
            icon="delete"
            title="Delete item"
          />
          {todo.status === "ongoing" && (
            <IconButton
              onClick={onCompleteTodo}
              icon="complete"
              title="Check item as complete"
            />
          )}

          {todo.status === "done" && (
            <IconButton
              onClick={onRevertTodo}
              icon="uncomplete"
              title="Uncheck item as complete"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoDisplay;

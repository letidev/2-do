import moment from "moment";
import { FC, useState } from "react";
import { createToDo, editTodo } from "../../utils/http-utils/todo-requests";
import { ToDo } from "../../utils/types/todo";
import DateInput from "./inputs/DateInput";
import SubmitButton from "./inputs/SubmitButton";
import TextInput from "./inputs/TextInput";

interface Props {
  refresh: () => void;
  action: "create" | "edit";
  todo?: ToDo;
}

const initialState = {
  title: "",
  dueDate: moment().format("yyyy-MM-DD"),
};

const ToDoForm: FC<Props> = ({ refresh, action, todo }) => {
  const [fields, setFields] = useState(
    todo ? { title: todo.title, dueDate: todo.dueDate } : initialState
  );
  const [error, setError] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setFields((prev) => ({
        ...prev,
        [e?.target.name]: e?.target?.value,
      }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (action === "create") {
      createToDo(fields.title, fields.dueDate)
        .then(() => {
          refresh();
          setFields(initialState);
        })
        .catch((e: Error) => setError(e.message));
    }

    if (action === "edit" && todo) {
      editTodo({ ...todo, title: fields.title, dueDate: fields.dueDate }).then(
        () => {
          refresh();
        }
      );
    }
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <div className="mb-3 text-base font-semibold text-red-500">{error}</div>
      <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-x-5">
        <div className="flex-grow">
          <TextInput
            label="Title"
            id="title"
            name="title"
            type="text"
            value={fields.title}
            required
            onChange={onInputChange}
          />
        </div>
        <DateInput
          label="Due Date"
          id="dueDate"
          name="dueDate"
          value={fields.dueDate}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="self-end w-fit">
        <SubmitButton text={action === "create" ? "Create" : "Save"} />
      </div>
    </form>
  );
};

export default ToDoForm;

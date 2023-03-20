import moment from "moment";
import { FC, useState } from "react";
import { createToDo } from "../../utils/http-utils/todo-requests";
import DateInput from "./inputs/DateInput";
import SubmitButton from "./inputs/SubmitButton";
import TextInput from "./inputs/TextInput";

interface Props {
  onSubmitCallback?: () => void;
}

const ToDoForm: FC<Props> = ({ onSubmitCallback }) => {
  const [fields, setFields] = useState({
    title: "",
    dueDate: moment().format("yyyy-MM-DD"),
  });
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

    createToDo(fields.title, fields.dueDate).catch((e: Error) =>
      setError(e.message)
    );

    if (onSubmitCallback) {
      onSubmitCallback();
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
        <SubmitButton text="Create" />
      </div>
    </form>
  );
};

export default ToDoForm;

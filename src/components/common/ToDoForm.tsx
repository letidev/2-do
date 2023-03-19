import React from "react";
import DateInput from "./inputs/DateInput";
import SubmitButton from "./inputs/SubmitButton";
import TextInput from "./inputs/TextInput";

const ToDoForm = () => {
  return (
    <form className="flex flex-col">
      <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-x-5">
        <div className="flex-grow">
          <TextInput label="Title" id="title" type="text" />
        </div>
        <DateInput label="Due Date" id="1" />
      </div>
      <div className="self-end w-fit">
        <SubmitButton text="Create" />
      </div>
    </form>
  );
};

export default ToDoForm;

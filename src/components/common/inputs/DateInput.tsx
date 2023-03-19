import moment from "moment";
import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const DateInput: FC<Props> = ({ label, id, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...rest}
        id={id}
        type="date"
        min={moment().format("yyyy-MM-DD")}
        className="block w-full rounded-md shadow-sm border-slate-400 hover:border-indigo-400 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default DateInput;

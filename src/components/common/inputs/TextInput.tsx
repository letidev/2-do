import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const TextInput: FC<Props> = ({ label, id, ...rest }) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      className="block w-full rounded-md shadow-sm border-slate-400 hover:border-indigo-400 focus:ring-indigo-500 sm:text-sm"
      {...rest}
    />
  </div>
);

export default TextInput;

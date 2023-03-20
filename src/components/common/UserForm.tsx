import React, { FC, useState } from "react";
import { saveUser } from "../../utils/http-utils/user-requests";
import { User } from "../../utils/types/user";
import SubmitButton from "./inputs/SubmitButton";
import TextInput from "./inputs/TextInput";

interface Props {
  user: User;
}

const UserForm: FC<Props> = ({ user }) => {
  const [fields, setFields] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [showSuccess, setShowSuccess] = useState(false);
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

    saveUser({
      ...user,
      firstName: fields.firstName,
      lastName: fields.lastName,
    }).then(() => {
      setError("");
      setShowSuccess(true);
    });
  };
  return (
    <div className="flex flex-col">
      <div className="mb-4 text-lg font-medium text-slate-800">
        {user.email}
      </div>

      <div className="mb-3 text-base font-semibold text-red-500">{error}</div>
      {showSuccess && (
        <div className="mb-3 text-base font-semibold text-green-600">
          Successfully saved profile!
        </div>
      )}
      <form className="flex flex-col" onSubmit={onSubmit}>
        <TextInput
          type="text"
          name="firstName"
          id="firstName"
          label="First Name"
          placeholder="Jane"
          required
          onChange={onInputChange}
          value={fields.firstName}
        />

        <TextInput
          type="text"
          name="lastName"
          id="lastName"
          label="Last name"
          placeholder="Smith"
          required
          onChange={onInputChange}
          value={fields.lastName}
        />
        <div className="self-end w-fit">
          <SubmitButton text="Save" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;

import React, { FC, useState } from "react";
import { changePassword } from "../../utils/http-utils/user-requests";
import SubmitButton from "./inputs/SubmitButton";
import TextInput from "./inputs/TextInput";

interface Props {
  userId: string;
}

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPasswordForm: FC<Props> = ({ userId }) => {
  const [fields, setFields] = useState(initialState);
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

    changePassword(
      userId,
      fields.oldPassword,
      fields.newPassword,
      fields.confirmNewPassword
    )
      .then(() => {
        setError("");
        setShowSuccess(true);
        setFields(initialState);
      })
      .catch((e: Error) => {
        setError(e.message);
        setShowSuccess(false);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="mb-3 text-base font-semibold text-red-500">{error}</div>
      {showSuccess && (
        <div className="mb-3 text-base font-semibold text-green-600">
          Successfully saved profile!
        </div>
      )}
      <form className="flex flex-col" onSubmit={onSubmit}>
        <TextInput
          type="password"
          name="oldPassword"
          id="oldPassword"
          label="Old Password"
          required
          onChange={onInputChange}
          value={fields.oldPassword}
        />

        <TextInput
          type="password"
          name="newPassword"
          id="newPassword"
          label="New password"
          required
          onChange={onInputChange}
          value={fields.newPassword}
        />

        <TextInput
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          label="Confirm New Password"
          onChange={onInputChange}
          value={fields.confirmNewPassword}
        />
        <div className="self-end w-fit">
          <SubmitButton text="Save" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

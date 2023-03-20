import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NonAuthenticatedGuard } from "../../../utils/guards";
import { registerUser } from "../../../utils/http-utils/user-requests";
import { RegisterUserData } from "../../../utils/types/user";
import SubmitButton from "../../common/inputs/SubmitButton";
import TextInput from "../../common/inputs/TextInput";
import BasicLayout from "../../layout/BasicLayout";

const Register: FC = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<RegisterUserData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerUser(fields)
      .then(() => {
        navigate("/");
      })
      .catch((e: Error) => setError(e.message));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setFields((prev) => ({
        ...prev,
        [e?.target.name]: e?.target?.value,
      }));
    }
  };

  return (
    <NonAuthenticatedGuard>
      <BasicLayout className="w-full px-5 sm:w-[500px]">
        <h2 className="pb-3 mb-5 text-3xl text-left border-b border-indigo-800 font-semibild">
          Register
        </h2>
        <div className="mb-3 text-base font-semibold text-red-500">{error}</div>
        <form onSubmit={onSubmit}>
          <TextInput
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="you@example.com"
            required
            onChange={onInputChange}
            value={fields.email}
          />

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

          <TextInput
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            onChange={onInputChange}
            value={fields.password}
          />

          <TextInput
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            required
            onChange={onInputChange}
            value={fields.confirmPassword}
          />
          <SubmitButton text="Register" />
        </form>
        <div className="mt-4">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-indigo-800 underline cursor-pointer hover:text-indigo-600"
          >
            Log in here!
          </Link>
        </div>
      </BasicLayout>
    </NonAuthenticatedGuard>
  );
};

export default Register;

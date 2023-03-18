import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constants";
import { NonAuthenticatedGuard } from "../../../utils/guards";
import { login } from "../../../utils/http-utils/user-requests";
import SubmitButton from "../../common/inputs/SubmitButton";
import TextInput from "../../common/inputs/TextInput";
import BasicLayout from "../../layout/BasicLayout";

const Login: FC = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
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

    login(fields.email, fields.password)
      .then(() => {
        navigate(PATHS.Home);
      })
      .catch((e: Error) => setError(e.message));
  };

  return (
    <NonAuthenticatedGuard>
      <BasicLayout className="w-full px-5 sm:w-[320px]">
        <h2 className="pb-3 mb-5 text-3xl text-left border-b border-indigo-800 font-semibild">
          Login
        </h2>
        <div className="mb-3 text-base font-semibold text-red-500">{error}</div>
        <form onSubmit={onSubmit}>
          <TextInput
            value={fields.email}
            type="text"
            name="email"
            id="email"
            label="Email"
            placeholder="you@example.com"
            required
            onChange={onInputChange}
          />

          <TextInput
            value={fields.password}
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            onChange={onInputChange}
          />
          <SubmitButton text="Sign In" />
        </form>
        <div className="mt-4">
          Don't have an account?&nbsp;
          <Link
            to="/register"
            className="text-indigo-800 underline cursor-pointer hover:text-indigo-600"
          >
            Sing up here!
          </Link>
        </div>
      </BasicLayout>
    </NonAuthenticatedGuard>
  );
};

export default Login;

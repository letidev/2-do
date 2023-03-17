import React, { FC } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../../common/inputs/SubmitButton";
import TextInput from "../../common/inputs/TextInput";
import BasicLayout from "../../layout/BasicLayout";

const Login: FC = () => {
  const onSubmit = () => {};

  return (
    <BasicLayout className="w-full px-5 sm:w-[320px]">
      <h2 className="text-3xl font-semibild text-left border-b pb-3 mb-5 border-indigo-800">
        Login
      </h2>
      <form onSubmit={onSubmit}>
        <TextInput
          type="text"
          name="email"
          id="email"
          label="Email"
          placeholder="you@example.com"
          required
        />

        <TextInput
          type="password"
          name="password"
          id="password"
          label="Password"
          required
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
  );
};

export default Login;

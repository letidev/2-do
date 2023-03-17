import React, { FC } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../../common/inputs/SubmitButton";
import TextInput from "../../common/inputs/TextInput";
import BasicLayout from "../../layout/BasicLayout";

const Register: FC = () => {
  const onSubmit = () => {};

  return (
    <BasicLayout className="w-full px-5 sm:w-[320px]">
      <h2 className="text-3xl font-semibild text-left border-b pb-3 mb-5 border-indigo-800">
        Register
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
          type="text"
          name="firstName"
          id="firstName"
          label="First Name"
          placeholder="Jane"
          required
        />

        <TextInput
          type="text"
          name="lastName"
          id="lastName"
          label="Last name"
          placeholder="Smith"
          required
        />

        <TextInput
          type="password"
          name="password"
          id="password"
          label="Password"
          required
        />

        <TextInput
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          required
        />
      </form>
      <SubmitButton text="Register" />
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
  );
};

export default Register;

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post(
      "https://task-blue-six.vercel.app/login",
      data
    );
    if (res.data.success) {
      navigate("/welcome", { replace: true, state: { email: data.email } });
    } else {
      setLoginError(res.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 border border-slate-500 p-6 md:p-10 rounded-md">
        <h3 className="text-3xl text-slate-800 text-center font-semibold">
          Log in
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="input-field">
            <h5>Email:</h5>
            <input
              className={`border border-black w-full py-1 pl-3 rounded-sm ${
                errors?.email && "border-red-500 focus:outline-red-500"
              }`}
              type="email"
              {...register("email", { required: "email is required" })}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="input-field">
            <h5>Password:</h5>
            <input
              className={`border border-black w-full py-1 pl-3 rounded-sm ${
                errors?.password && "border-red-500 focus:outline-red-500"
              }`}
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 character",
                },
                maxLength: {
                  value: 10,
                  message: "Password cannot exceed more than 10 characters",
                },
              })}
            />
            {errors?.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <p className="text-red-500">{loginError}</p>
          <button
            className="py-1.5 w-full bg-slate-800 text-white text-lg rounded-sm"
            type="submit"
          >
            Log in
          </button>
        </form>
        <p className="mt-5 text-center">
          Don't have an Account?{" "}
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Login = () => {
  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: Login } = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post("http://localhost:3000/login", userData);
      const token = `Bearer ${res.data.token}`;
      localStorage.setItem("token", token);
      return res.data;
    },
    onSuccess: (data) => {
      alert(data.message);
      Navigate('/')
      reset();
    },
    onError:(error)=>{
      alert(error.message)
    }
  });

  const handleLogin = (data) => {
    Login(data);
  };
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Login</legend>

      <form onSubmit={handleSubmit(handleLogin)}>
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="input"
          placeholder="Email"
        />
        {errors?.email?.type === "required" && (
          <p className="text-red-500 text-sm mt-1">Email is Required</p>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="input"
          placeholder="Password"
        />
        {errors?.password?.type === "required" && (
          <p className="text-red-500 text-sm mt-1">Password is Required</p>
        )}

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </form>
    </fieldset>
  );
};

export default Login;

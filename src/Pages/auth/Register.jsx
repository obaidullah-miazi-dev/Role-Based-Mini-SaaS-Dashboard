import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: Register } = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post("http://localhost:3000/register", userData);
      return res.data
    },
    onSuccess: (data) => {
      alert(data.message);
      reset();
    },
  });

  const handleRegister = (data) => {
    Register(data);
  };
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Register</legend>

      <form onSubmit={handleSubmit(handleRegister)}>
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
          Register
        </button>
      </form>
    </fieldset>
  );
};

export default Register;

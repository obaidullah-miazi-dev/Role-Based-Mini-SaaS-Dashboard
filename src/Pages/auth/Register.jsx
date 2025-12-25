import React from "react";

const Register = () => {
    const handleRegister
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Register</legend>

      <form onSubmit={handleRegister}>
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button type="submit" className="btn btn-neutral mt-4">Register</button>
      </form>
    </fieldset>
  );
};

export default Register;

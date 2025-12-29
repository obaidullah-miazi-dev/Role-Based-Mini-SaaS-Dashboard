import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navlinks = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/tasks"}>Tasks</NavLink>
      {user?.role === "admin" && <NavLink to={"/dashboard"}>Dashboard</NavLink>}
    </>
  );

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("log out successfully");
  };

  console.log(user);
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Saas Dashboard</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex  justify-center gap-16 font-semibold">
          {navlinks}
        </ul>
      </div>
      <div className="navbar-end flex gap-3">
        {user ? (
          <button onClick={handleLogOut} className="btn btn-error text-white">
            Log Out{" "}
          </button>
        ) : (
          <>
            <button className="btn btn-primary">
              <NavLink to={"/login"}>Login</NavLink>
            </button>
            <button className="btn btn-primary">
              <NavLink to={"/register"}>Register</NavLink>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

let LoginPage = ({ authenticate }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, SetErrors] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();

    let baseUrl = "http://127.0.0.1:4000/api/auth/login";
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(baseUrl, user, { headers })
      .then((response) => {
        // put token and email in the local storage
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("email", response.data.user.email);
        // authenticate user
        authenticate();
        navigate("/task/show");
      })
      .catch((response) => {
        console.log(response.response.data);
        SetErrors(response.response.data);
      });
  };

  return (
    <div className="container-sm  p-5">
      <h1 className="p-5">Login Page</h1>
      <form className="col-4 mx-auto" onSubmit={loginUser}>
        <div className="form-group mb-2 mt-3 ">
          <label className="h3">Email</label>
          <input
            type="email"
            className="form-control mt-2 "
            placeholder="Enter your email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mt-4">
          <label className="h3">Password</label>
          <input
            type="password"
            className="form-control mt-2"
            placeholder="Enter your password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block m-4 ">
          Login
        </button>

        <NavLink className="btn btn-secondary btn-block m-4 " to={"/signup"}>
          Sign Up
        </NavLink>
        <div className="">
          <div className=" w-100 mx-auto alert text-danger h5 mt-5">
            {errors}
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;

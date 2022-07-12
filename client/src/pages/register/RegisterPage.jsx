import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let RegisterPage = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, SetErrors] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    e.preventDefault();

    //
    let baseUrl = "http://127.0.0.1:4000/api/auth/signup";
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(baseUrl, user, { headers })
      .then((response) => {
        console.log(response.data);
        navigate("/verify");
      })
      .catch((response) => {
        console.log(response.response.data);
        SetErrors(response.response.data);
        console.log(errors);
      });
  };

  return (
    <div className="container-sm  p-5">
      <h1 className="p-5">Sign Up Page</h1>
      <form className="col-4 mx-auto" onSubmit={createUser}>
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
        <button type="submit" className="btn btn-primary btn-block mt-4">
          SIGN UP
        </button>
        <div className="">
          <div className=" w-100 mx-auto alert text-danger h5 mt-5">
            {errors}
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;

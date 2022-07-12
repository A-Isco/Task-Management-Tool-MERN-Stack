import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

let EditProfilePage = () => {
  let email = window.localStorage.getItem("email");

  let navigate = useNavigate();

  const [resetPassword, setResetPassword] = useState({
    email: email,
    oldPassword: "",
    newPassword: "",
  });

  const [errors, SetErrors] = useState("");

  const handleChange = (e) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };

  const resetPasswordFunction = (e) => {
    e.preventDefault();

    let baseUrl = "http://127.0.0.1:4000/api/user/resetPassword";
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .patch(baseUrl, resetPassword, { headers })
      .then((response) => {
        navigate("/task/show");
      })
      .catch((response) => {
        SetErrors(response.response.data);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container-sm  p-5">
        <h1 className="p-5">Edit Profile</h1>
        <form className="col-4 mx-auto" onSubmit={resetPasswordFunction}>
          <div className="form-group mb-2 mt-3 ">
            <label className="h3">Email</label>
            <h4 className="pb-4 text-primary">{email}</h4>
          </div>
          <div className="form-group mb-2 mt-3 ">
            <label className="h3">Old Password</label>
            <input
              type="password"
              className="form-control mt-2 "
              placeholder="Enter Old Password"
              name="oldPassword"
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group mb-2 mt-3 ">
            <label className="h3">New Password</label>
            <input
              type="password"
              className="form-control mt-2 "
              placeholder="Enter New Password"
              name="newPassword"
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Reset Password
          </button>
          <div className="">
            <div className=" w-100 mx-auto alert text-danger h5 mt-5">
              {errors}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfilePage;

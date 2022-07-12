import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let VerificationPage = () => {
  let navigate = useNavigate();

  const [verification, setVerification] = useState({
    email: "",
    verificationCode: "",
  });
  const [errors, SetErrors] = useState("");

  const handleChange = (e) => {
    setVerification({ ...verification, [e.target.name]: e.target.value });
  };

  const verifyAccount = (e) => {
    e.preventDefault();

    let baseUrl = "http://127.0.0.1:4000/api/auth/verify";
    const headers = {
      "Content-Type": "application/json",
    };

    console.log(verification);

    axios
      .post(baseUrl, verification, { headers })
      .then((response) => {
        navigate("/login");
      })
      .catch((response) => {
        console.log(response.response.data);
        SetErrors(response.response.data);
      });
  };

  return (
    <div className="container-sm  p-5">
      <h1 className="p-5">Verify Your Account</h1>
      <p className="p-5 h4 text-primary">
        A verification code was sent to your email .. Check it out and use it to
        verify your account
      </p>
      <form className="col-4 mx-auto" onSubmit={verifyAccount}>
        <div className="form-group mb-2 mt-3 ">
          <label className="h3">Confirm Your Email</label>
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
        <div className="form-group mb-2 mt-3 ">
          <label className="h3">Verification Code</label>
          <input
            type="text"
            className="form-control mt-2 "
            placeholder="Enter The Verification Code"
            name="verificationCode"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Verify Account
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
export default VerificationPage;

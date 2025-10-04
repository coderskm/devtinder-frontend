import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../helpers/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASEURL}/login`, { emailId, password }, { withCredentials: true }); //credentials setup in frontend
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data||"Something Went Wrong !");
      console.log(error);
    }
  };

  return (
    <div className="my-10 card card-border bg-amber-100 w-96 m-auto">
      <div className="card-body">
        <h2 className="text-center text-2xl font-medium">LOGIN</h2>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={emailId}
              className="input"
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Your Email ID ..."
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter Your Password ..."
            />
          </fieldset>
        </div>
        <p className="text-red-400">{error}</p>
        <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
